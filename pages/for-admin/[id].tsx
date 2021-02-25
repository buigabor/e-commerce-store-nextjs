/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';
import slugify from 'slugify';
import Layout from '../../components/Layout';
import {
  Material,
  Printer,
  useMaterials,
  usePrinters,
} from '../../components/PrintersContext';

const editProductStyles = css`
  display: flex;
  gap: 5rem;
  padding: 4rem 0;
  align-items: center;
  justify-content: center;

  .form-wrapper {
    flex-basis: 40%;

    form {
      display: flex;
      flex-direction: column;
      div {
        margin-bottom: 0.5rem;
        flex-basis: 50%;
      }
    }
    &__country {
      display: flex;
      justify-content: stretch;
      gap: 1rem;
    }
    &__city {
      display: flex;
      justify-content: stretch;
      gap: 1rem;
    }
  }

  .form-btn {
    align-self: flex-end;
    color: #fff;
    border-radius: 4px;
    background-color: #5252f2;
    font-weight: 500;
    margin-top: 13px;
    border: none;
    padding: 0.8rem 2.3rem;
    font-size: 1.1em;
    max-width: 250px;
    cursor: pointer;
    text-transform: uppercase;
    outline: none;
    pointer-events: all;
    transition: all 0.2s linear;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    &:hover {
      background-color: #3535f5;
    }
  }

  .cart-content {
    align-self: flex-start;
    border: 1px solid rgba(167, 166, 166, 0.65);
    padding: 2.5rem;
    border-radius: 14px;
    transform: translateY(0rem);
  }
`;

type Product = Printer | Material | undefined;

const product = () => {
  const printersState = usePrinters();
  const materialsState = useMaterials();
  const [product, setProduct] = useState<Product>();
  const [productId, setProductId] = useState<string | number | string[]>();

  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    setProductId(id);
  }, []);
  useEffect(() => {
    let product: Product = printersState.printers.find((printer) => {
      return printer.id === Number(productId);
    });

    if (!product) {
      product = materialsState.materials.find((material) => {
        return material.id === productId;
      });
    }
    setProduct(product);
  }, [productId]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios({
      method: 'PATCH',
      url: '/api/products',
      data: product,
    })
      .then((res) => {
        if (res.status < 300) {
          alert('Update Success!');
          router.push('/for-admin');
        } else {
          alert('Update Failed!');
        }
      })
      .catch((e) => console.log(e));
  };

  if (product && 'technology' in product) {
    return (
      <Layout>
        <div css={editProductStyles}>
          <div className="form-wrapper">
            <form onSubmit={onSubmit} noValidate autoComplete="off">
              <TextField
                name="printingSize"
                id="outlined-basic"
                label="Printing Size"
                variant="outlined"
                value={product.printingSize}
                onChange={(e) => {
                  setProduct({ ...product, [e.target.name]: e.target.value });
                }}
              />
              <TextField
                name="videoUrl"
                id="outlined-basic"
                label="Video URL"
                variant="outlined"
                value={product.videoUrl}
                onChange={(e) => {
                  setProduct({ ...product, [e.target.name]: e.target.value });
                }}
              />
              <div className="form-wrapper__country">
                <TextField
                  id="outlined-basic"
                  label="Printing Speed"
                  name="printingSpeed"
                  variant="outlined"
                  value={product.printingSpeed}
                  onChange={(e) => {
                    setProduct({ ...product, [e.target.name]: e.target.value });
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="File Format"
                  name="fileFormat"
                  variant="outlined"
                  value={product.fileFormat}
                  onChange={(e) => {
                    setProduct({ ...product, [e.target.name]: e.target.value });
                  }}
                />
              </div>
              <div className="form-wrapper__city">
                <TextField
                  id="outlined-basic"
                  label="Price (€)"
                  variant="outlined"
                  name="price"
                  value={product.price}
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      [e.target.name]: Number(e.target.value),
                    });
                  }}
                />
                <TextField
                  name="technology"
                  id="outlined-basic"
                  label="Technology"
                  variant="outlined"
                  value={product.technology}
                  onChange={(e) => {
                    setProduct({ ...product, [e.target.name]: e.target.value });
                  }}
                />
              </div>
              <TextField
                name="description"
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                value={product.description}
                onChange={(e) => {
                  setProduct({ ...product, [e.target.name]: e.target.value });
                }}
              />
              <button className="form-btn">Update</button>
            </form>
          </div>
          <div className="cart-content">
            <Image
              width={250}
              height={250}
              src={`/productImages/${slugify(product!.name)}.jpg`}
            ></Image>
          </div>
        </div>
      </Layout>
    );
  } else if (product && 'type' in product) {
    return (
      <Layout>
        <div css={editProductStyles}>
          <div className="form-wrapper">
            <form onSubmit={onSubmit} noValidate autoComplete="off">
              <TextField
                name="type"
                id="outlined-basic"
                label="Type Of Material"
                variant="outlined"
                value={product.type}
                onChange={(e) => {
                  setProduct({ ...product, [e.target.name]: e.target.value });
                }}
              />
              <TextField
                id="outlined-basic"
                label="Price (€)"
                variant="outlined"
                value={product.price}
                name="price"
                onChange={(e) => {
                  setProduct({
                    ...product,
                    [e.target.name]: Number(e.target.value),
                  });
                }}
              />
              <button className="form-btn">Update</button>
            </form>
          </div>
          <div className="cart-content">
            <Image
              width={250}
              height={250}
              src={`/productImages/${slugify(product!.name)}.jpg`}
            ></Image>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div>Rip</div>
      </Layout>
    );
  }
};

export default product;
