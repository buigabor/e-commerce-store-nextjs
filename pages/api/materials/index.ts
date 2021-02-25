import { NextApiRequest, NextApiResponse } from 'next';
import { getMaterials } from '../../../utils/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    console.log(req.body);
    // const {id} = req.body
    // const material = await getMaterialById()
    const materials = await getMaterials();
    if (!materials) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({ materials });
  }
};
