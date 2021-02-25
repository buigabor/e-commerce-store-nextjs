import { NextApiRequest, NextApiResponse } from 'next';
import { getMaterialById } from '../../../utils/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const materialId = req.query.id;
  if (req.method === 'GET') {
    const material = await getMaterialById(materialId);
    if (!material) {
      return res.status(404).json({ success: false });
    }
    return res.status(200).json({ success: true, material });
  }
};
