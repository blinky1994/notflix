import { magicAdmin } from "../../lib/magic";
import jwt from 'jsonwebtoken';
import { isNewUser, createNewUser } from "../../lib/db/hasura";
import { setTokenCookie } from "../../lib/cookies";

export default async function stats(req, res) {
  if (req.method === 'POST') {

    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(403).json('Not allowed')
        } else {
            const decoded= jwt.verify(token, process.env.JWT_SECRET_KEY);
            res.json({ msg: 'it works', decoded })
        }
    } catch (error) {
        console.error('Error occured /stats', error)
        res.status(500).send({ done:false, error: error?.message})
    }
  }
}
