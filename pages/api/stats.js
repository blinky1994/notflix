import jwt from 'jsonwebtoken';
import { findVideoIdByUser, updateStats, insertStats } from "../../lib/db/hasura";

export default async function stats(req, res) {

  try {
    const token = req.cookies.token;
    if (!token) {
        res.status(403).json('Not allowed')
    } else {
        const inputParams = req.method === 'POST' ? req.body : req.query;
        const { videoId } = inputParams;

        if (videoId) {
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
          const userId = decodedToken.issuer;
          
          const findVideo = await findVideoIdByUser(userId, videoId, token);

          const doesStatsExist = findVideo?.length > 0;

          if (req.method === 'POST') {
            const { favourited, watched = true } = req.body;
            if (doesStatsExist) {
              //  Update it
              const response = await updateStats(token, { 
                favourited,
                userId,
                watched,
                videoId
              });
              res.json(response);
            } else {
              // Add it
              const response = await insertStats(token, { 
                favourited,
                watched,
                userId,
                videoId
              });
              res.json(response);
            }
          }

          else if (req.method === 'GET') {
            if (doesStatsExist) {
              //  Update it
              res.json(findVideo);
            } else {
              // Add it
              res.status(404).json({ user: null, msg: 'Video not found' });
            }
          }
        }
    }
    
  } catch (error) {
    console.error('Error occured /stats', error)
    res.status(500).send({ done:false, error: error?.message})
  }

}
