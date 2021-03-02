import { NextApiRequest, NextApiResponse } from 'next';
import { getUserById } from '../../../utils/database';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.id;

  const user = await getUserById(Number(userId));
  if (!user) {
    return res.status(404).json({ success: false });
  }

  return res.status(200).json({ user });
};

export default handler;
