/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import slugify from 'slugify';
import {
  CartMaterialItem,
  CartPrinterItem,
  useCart,
  useDispatchCart,
} from '../../components/CartContext';
import Layout from '../../components/Layout';
import { Material } from '../../components/MaterialsContext';
import { useUpdateOverlay } from '../../components/OverlayContext';
import {} from '../../components/Providers';
import { server } from '../../config';

interface MaterialProps {
  materialFetched: Material;
}

const materialStyles = css`
  display: flex;
  flex-direction: column;
  padding: 1rem 5rem;
  margin-top: 4rem;
  justify-content: center;
  align-items: center;

  hr {
    border-top: 1px solid gray;
    width: 80%;
    margin: 4rem 0;
  }
  .printer-header {
    display: flex;
    gap: 10rem;
    &__img {
    }
    &__content {
      display: flex;
      flex-direction: column;
    }
    &__cta {
      background-color: #5252f2;
      box-shadow: none;
      color: #fff;
      border: none;
      border-radius: 5px;
      padding: 0.8rem 2rem;
      font-size: 16px;
      font-weight: 600;
      outline: none;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      margin-top: 1.5rem;
      align-self: flex-end;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

      &:hover {
        background-color: #3535f5;
      }
    }

    &__cartBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1.5rem;
      align-self: flex-end;
      span {
        padding: 0.38rem 0.75rem;
        margin: 0 1rem;
        border-radius: 3px;
        font-size: 1.1em;
        border: 1px solid gray;
      }
      &-btn {
        text-align: center;
        background-color: #5252f2;
        box-shadow: none;
        color: #fff;
        border: none;
        border-radius: 3px;
        padding: 0.1rem 0.6rem;
        font-size: 1.4em;
        font-weight: 300;
        outline: none;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
        border: 2px solid transparent;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        &:hover {
          background-color: transparent;
          border: 2px solid #5252f2;
          color: #5252f2;
        }
      }
    }
  }

  .red {
    background-color: #f5534f;
    &:hover {
      background-color: transparent;
      border: 2px solid #f5534f;
      color: #f5534f;
    }
  }

  .printer-trusted {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__text {
      margin-bottom: 2rem;
      font-size: 1.25rem;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.56);
    }

    &__brands {
      display: flex;
      gap: 3rem;
    }
  }
`;

const MaterialComponent = ({ materialFetched }: MaterialProps) => {
  const [material, setMaterial] = useState<Material>();
  const dispatch = useDispatchCart();
  const toggleOverlay = useUpdateOverlay();

  const cartState = useCart();

  function checkIfInCart() {
    return cartState.cart.some(
      (cartItem: CartPrinterItem | CartMaterialItem) => {
        return cartItem.id === materialFetched.id;
      },
    );
  }

  function showQuantity() {
    if (material) {
      const currentMaterial = cartState.cart.find((cartItem) => {
        return cartItem.id === material.id;
      });
      return currentMaterial?.quantity;
    }
    return null;
  }

  function createData(name: string, value: string | string[] | number) {
    return { name, value };
  }

  useEffect(() => {
    setMaterial(materialFetched);
  }, [materialFetched]);

  if (material) {
    const rows = [
      createData('Type', material.type),
      createData('Price', material.price + ' €'),
    ];
    return (
      <>
        <Head>
          <title>{material.name} | 3D BUIG </title>
        </Head>
        <Layout>
          <div css={materialStyles}>
            <div className="printer-header">
              <div className="printer-header__img">
                <Image
                  width={300}
                  height={300}
                  src={`/productImages/${slugify(
                    material.name.toLowerCase(),
                  )}.jpg`}
                />
              </div>
              <div className="printer-header__content">
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>{material.name}</TableCell>
                        <TableCell align="right">Values</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {checkIfInCart() ? (
                  <div className="printer-header__cartBtn">
                    <button
                      className="printer-header__cartBtn-btn red"
                      onClick={() => {
                        dispatch({
                          type: 'DECREMENT_QUANTITY',
                          payload: material.id,
                        });
                      }}
                    >
                      -
                    </button>
                    <span>{showQuantity()}</span>
                    <button
                      className="printer-header__cartBtn-btn"
                      onClick={() => {
                        dispatch({
                          type: 'INCREMENT_QUANTITY',
                          payload: material.id,
                        });
                      }}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      dispatch({
                        type: 'ADD_TO_CART',
                        payload: { ...material, quantity: 1 },
                      });
                      toggleOverlay();
                    }}
                    className="printer-header__cta"
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            </div>
            <hr />
            <div className="printer-trusted">
              <div className="printer-trusted__text">
                <p>Trusted by over 110,000 engineers worldwide</p>
              </div>
              <div className="printer-trusted__brands">
                <Image
                  width={100}
                  height={100}
                  src="https://www.3dhubs.com/images/homev2/trusted_by/ABB.svg"
                />
                <Image
                  width={100}
                  height={100}
                  src="https://www.3dhubs.com/images/homev2/trusted_by/NASA.svg"
                />
                <Image
                  width={100}
                  height={100}
                  src="https://www.3dhubs.com/images/homev2/trusted_by/Audi.svg"
                />

                <Image
                  width={70}
                  height={70}
                  src="https://www.3dhubs.com/images/homev2/trusted_by/HP.svg"
                />
                <Image
                  width={100}
                  height={100}
                  src="https://www.3dhubs.com/images/homev2/trusted_by/fillauer.svg"
                />
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  } else {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;

  const materialFetched = (await axios(`${server}/api/materials/${id}`)).data
    .material;

  return { props: { materialFetched } };
}

export default MaterialComponent;
