import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import {
  Material,
  Printer,
  useDispatchMaterials,
  useDispatchPrinters,
  useMaterials,
  usePrinters,
} from '../../components/PrintersContext';
import {
  getAllPrintersWithCompatibleMaterials,
  getMaterials,
} from '../../utils/database';

interface AdminProps {
  printersFetched: Printer[];
  materialsFetched: Material[];
}

const Admin = ({ printersFetched, materialsFetched }: AdminProps) => {
  const printers = usePrinters();
  const materials = useMaterials();
  const dispatchMaterials = useDispatchMaterials();
  const dispatchPrinters = useDispatchPrinters();
  console.log(printers);
  console.log(materials);

  useEffect(() => {
    dispatchMaterials({ type: 'SET_MATERIALS', payload: materialsFetched });
    dispatchPrinters({
      type: 'SET_PRINTERS',
      payload: printersFetched,
    });
  }, []);

  return (
    <Layout>
      <div></div>
    </Layout>
  );
};
export async function getStaticProps() {
  const printersWithCompatibleMats = await getAllPrintersWithCompatibleMaterials();
  const materialsFetched = await getMaterials();

  return {
    props: { printersFetched: printersWithCompatibleMats, materialsFetched },
  };
}

export default Admin;
