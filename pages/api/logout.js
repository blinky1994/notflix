import { deleteTokenCookie } from "../../lib/cookies";
import { magicAdmin } from "../../lib/magic";
import jwt from 'jsonwebtoken';
import { verifyToken } from "../../lib/utils";

export default async function logout(req, res) {
    try {
        const token = req.cookies.token;
        const userId = await verifyToken(token);
        deleteTokenCookie(res);
        try {
            await magicAdmin.users.logoutByIssuer(userId);
        } catch (error) {
            console.error("Error occurred while logging out magic user", error.data);
        }

        res.writeHead(302, { Location: "/login" });
        res.end();
    } catch (error) {
        console.error('Error logging out: ', error)
        res.status(401).json({ message: 'User is not logged in'});
    }
}
  