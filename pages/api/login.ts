import { NextApiRequest, NextApiResponse } from 'next';

const {
  getUserByName,
  insertSession,
  deleteExpiredSessions,
} = require('../../utils/database');
const cookie = require('cookie');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;
      const currentUser = await getUserByName(username);
      if (!currentUser) {
        res.status(401).json({ success: false });
      }
      const maxAge = 60 * 60 * 24; // 24 hours
      const token = jwt.sign(username, process.env.JWT_SECRET);
      await insertSession(token, currentUser.id);
      const match = await bcrypt.compare(password, currentUser.password);
      if (!match) {
        return res.status(401).json({ success: false });
      }

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'lax',
          expiresIn: new Date(Date.now() + maxAge * 1000),
          path: '/',
        }),
      );
      await deleteExpiredSessions();
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
};

export default handler;
