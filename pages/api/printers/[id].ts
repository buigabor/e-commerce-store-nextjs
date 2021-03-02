import { NextApiRequest, NextApiResponse } from 'next';
import { getPrintersById } from '../../../utils/database';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const printerId = req.query.id;
  if (req.method === 'GET') {
    const printer = await getPrintersById(Number(printerId));
    if (!printer) {
      return res.status(404).json({ success: false });
    }
    return res.status(200).json({ success: true, printer });
  }
};

export default handler;
