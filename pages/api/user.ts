import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSessionByToken, getUserById } from '../../utils/database';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { token } = cookie.parse(req.headers.cookie || '');

    const session = await getSessionByToken(token);
    if (!session) {
      return res.status(404).json({ success: false });
    }
    const user = await getUserById(session.userId);
    if (!user) {
      return res.status(404).json({ success: false });
    }

    return res.status(200).json({ user });
  }
};

export default handler;
