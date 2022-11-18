import jwt from 'jsonwebtoken';
import { findVideoIdByUser } from "../../lib/db/hasura";

export default async function stats(req, res) {
  if (req.method === 'POST') {

    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(403).json('Not allowed')
        } else {
            const decoded= jwt.verify(token, process.env.JWT_SECRET_KEY);

            const userId = 'did:ethr:0x67dd71A73682F0023caEc8A99A2c57Ec00Aa63e4';
            const videoId = 'FtZAS9gtqcs';

            const findVideoId = await findVideoIdByUser(userId, videoId, token);

            res.json({ msg: 'it works', decoded, findVideoId })
        }
    } catch (error) {
        console.error('Error occured /stats', error)
        res.status(500).send({ done:false, error: error?.message})
    }
  }
}
