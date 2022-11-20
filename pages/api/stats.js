import jwt from 'jsonwebtoken';
import { findVideoIdByUser, updateStats, insertStats } from "../../lib/db/hasura";

export default async function stats(req, res) {
  if (req.method === 'POST') {

    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(403).json('Not allowed')
        } else {
            const { videoId, favourited, watched = true } = req.body;

            if (videoId) {
              const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
              const userId = decodedToken.issuer;
              
              const doesStatsExist = await findVideoIdByUser(userId, videoId, token);
              if (doesStatsExist) {
                //  Update it
                const response = await updateStats(token, { 
                  favourited,
                  userId,
                  watched,
                  videoId
                });
                res.json({ data: response });
              } else {
                // Add it
                const response = await insertStats(token, { 
                  favourited,
                  watched,
                  userId,
                  videoId
                });
                res.json({ data: response });
              }
            }
        }
    } catch (error) {
        console.error('Error occured /stats', error)
        res.status(500).send({ done:false, error: error?.message})
    }
  }
}
