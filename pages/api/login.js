import { magicAdmin } from "../../lib/magic";
import jwt from 'jsonwebtoken';
import { isNewUser } from "../../lib/db/hasura";

export default async function login(req, res) {
  if (req.method === 'POST') {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.substr(7) : '';

      const metadata = await magicAdmin.users.getMetadataByToken(didToken);

      // JWT
      const token = jwt.sign({
        ...metadata,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user", "admin"],
          "x-hasura-default-role": "user",
          "x-hasura-user-id": `${metadata.issuer}`,
        },
      },  
        process.env.JWT_SECRET_KEY
      )

      //Check if user exists
      const isNewUserQuery = await isNewUser(token);
      
      res.status(200).json({ isNewUserQuery });
    } catch (error) {
      console.error('Something went wrong: ', error);
      res.status(500).json({ done: false });
    }
  } else {
    res.json({ done: false })
  }
}
