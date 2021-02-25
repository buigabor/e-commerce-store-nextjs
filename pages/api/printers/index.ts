import { NextApiRequest, NextApiResponse } from 'next';
import { getAllPrintersWithCompatibleMaterials } from '../../../utils/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const printers = await getAllPrintersWithCompatibleMaterials();
    if (!printers) {
      return res.status(400).json({ success: false });
    }

    return res.status(200).json({ printers });
  }
};
