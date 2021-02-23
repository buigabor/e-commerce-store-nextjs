/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import {
  Material,
  Printer,
  useMaterials,
  usePrinters,
} from '../../components/PrintersContext';

const formStyles = css``;

const product = () => {
  const printersState = usePrinters();
  const materialsState = useMaterials();
  const [product, setProduct] = useState<Printer | Material | undefined>();
  const [productId, setProductId] = useState<
    string | number | undefined | string[]
  >();
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    setProductId(id);
  }, []);
  useEffect(() => {
    console.log(productId);

    let product: Printer | Material | undefined = printersState.printers.find(
      (printer) => {
        return printer.id === Number(productId);
      },
    );
    if (!product) {
      product = materialsState.materials.find((material) => {
        return material.id === productId;
      });
    }
    setProduct(product);
  }, [productId]);
  console.log(product);
  return (
    <Layout>
      <div>
        <form noValidate autoComplete="off">
          <TextField id="standard-basic" label="Standard" />
          <TextField id="filled-basic" label="Filled" variant="filled" />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </form>
      </div>
    </Layout>
  );
};

export default product;
