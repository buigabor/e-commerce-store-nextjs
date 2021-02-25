import { NextApiRequest, NextApiResponse } from 'next';

const {
  deletePrinterById,
  deleteMaterialById,
  updateMaterialById,
  updatePrinterById,
} = require('../../utils/database');

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    const { id } = req.body;
    if (typeof id === 'number') {
      const deletedPrinter = await deletePrinterById(id);
      if (!deletedPrinter) {
        return res.status(404).json({ success: false });
      }
      return res.status(200).json({ success: true });
    } else if (typeof id === 'string') {
      const deletedMaterial = await deleteMaterialById(id);
      if (!deletedMaterial) {
        return res.status(404).json({ success: false });
      }
      return res.status(200).json({ success: true });
    }
  }

  if (req.method === 'PATCH') {
    const { id } = req.body;
    if (typeof id === 'number') {
      const updatedPrinter = await updatePrinterById(id, req.body);
      if (!updatedPrinter) {
        return res.status(404).json({ success: false });
      }
      return res.status(200).json({ success: true });
    } else if (typeof id === 'string') {
      const updatedMaterial = await updateMaterialById(id, req.body);

      if (!updatedMaterial) {
        return res.status(404).json({ success: false });
      }
      return res.status(200).json({ success: true });
    }
  }
};
