const {
  deletePrinterById,
  deleteMaterialById,
} = require('../../utils/database');

export default async (req, res) => {
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
};
