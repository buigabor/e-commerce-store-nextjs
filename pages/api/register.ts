import { NextApiRequest, NextApiResponse } from 'next';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const {
  saveUser,
  getUserByName,
  insertSession,
} = require('../../utils/database');
const cookie = require('cookie');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Tokens = require('csrf');

const tokens = new Tokens();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { username, email, token, password } = req.body;
      // Check CSRF token validity
      const secret = process.env.CSRF_TOKEN_SECRET;

      if (typeof secret === 'undefined') {
        res.status(500).send({ success: false });
        throw new Error(
          'CSRF_TOKEN_SECRET environment variable not configured!',
        );
      }

      const verified = tokens.verify(secret, token);

      if (!verified) {
        return res.status(401).send({ success: false });
      }

      // Check if username is already taken
      const usernameAlreadyTaken =
        typeof (await getUserByName(username)) !== 'undefined';

      if (usernameAlreadyTaken) {
        return res.status(409).send({ success: false });
      }

      // Hash password
      const passwordHashed = await bcrypt.hash(password, 10);

      // Save user to DB
      let user = { username, email, password: passwordHashed };
      await saveUser(user);

      // Create JWT and send it back in a cookie
      const jsonwebtoken = jwt.sign(username, process.env.JWT_SECRET);
      const currentUser = await getUserByName(username);
      // Save session
      await insertSession(jsonwebtoken, currentUser.id);
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', jsonwebtoken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 3600,
          path: '/',
        }),
      );
      return res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json(error);
    }
  }
};
