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
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import slugify from 'slugify';
import {
  CartMaterialItem,
  CartPrinterItem,
  useCart,
  useDispatchCart,
} from '../../components/CartContext';
import Layout from '../../components/Layout';
import { useUpdateOverlay } from '../../components/OverlayContext';
import { Printer } from '../../components/PrintersContext';
import { server } from '../../config';
import { getAllPrintersIds, getCompatibleMatsById } from '../../utils/database';

const printerStyles = css`
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

  .printer-description {
  }
  .printer-video {
    margin: 2rem 0;
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

interface PrinterProps {
  printerFetched: Printer;
}

const PrinterComponent = ({ printerFetched }: PrinterProps) => {
  const [printer, setPrinter] = useState<Printer | null>(null);
  const dispatch = useDispatchCart();
  const toggleOverlay = useUpdateOverlay();

  const cartState = useCart();

  function checkIfInCart() {
    return cartState.cart.some(
      (cartItem: CartPrinterItem | CartMaterialItem) => {
        return cartItem.id === printerFetched.id;
      },
    );
  }

  function showQuantity() {
    if (printer) {
      const currentPrinter = cartState.cart.find((cartItem) => {
        return cartItem.id === printer.id;
      });
      return currentPrinter?.quantity;
    }
    return null;
  }

  useEffect(() => {
    setPrinter(printerFetched);
  }, [printerFetched]);

  function createData(name: string, value: string | string[] | number) {
    return { name, value };
  }

  if (printer) {
    const rows = [
      createData('Technology', printer.technology),
      createData('File Format', printer.fileFormat),
      createData('Compatible Materials', printer.compatibleMaterial.join(', ')),
      createData('Printing Size', printer.printingSize),
      createData('Price', printer.price + ' €'),
    ];
    return (
      <>
        <Head>
          <title>{printer.name} | 3D BUIG </title>
        </Head>
        <Layout>
          <div css={printerStyles}>
            <div className="printer-header">
              <div className="printer-header__img">
                <Image
                  width={400}
                  height={400}
                  src={`/productImages/${slugify(printer.name)}.jpg`}
                />
              </div>
              <div className="printer-header__content">
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>{printer.name}</TableCell>
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
                          payload: printer.id,
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
                          payload: printer.id,
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
                        payload: { ...printer, quantity: 1 },
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
            <div className="printer-description">
              <div>
                <h2>{printer.name}</h2>
                <h3>Description</h3>
                <p>{printer.description}</p>
              </div>
            </div>
            <div className="printer-video">
              <ReactPlayer url={printer.videoUrl} />
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
    return <div>Loading...</div>;
  }
};

export default PrinterComponent;

export async function getStaticPaths() {
  // Return a list of possible value for id
  const printersIdFetched = await getAllPrintersIds();
  const printersId = printersIdFetched.map((printer: Printer) => {
    return { params: { id: String(printer.id) } };
  });
  printersId.splice(printersId.length - 2, 2);
  return {
    paths: printersId,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // const printerFetched = await getPrintersById(Number(params?.id));
  const printerFetched = (await axios(`${server}/api/printers/${params?.id}`))
    .data.printer;
  console.log(printerFetched);

  const compatibleMaterial = await getCompatibleMatsById(printerFetched.id);

  // Combine the compatible materials with the printer...
  const modifiedCompatibleMaterial = compatibleMaterial.map(
    (mat: any) => mat.name,
  );

  const printer = {
    ...printerFetched,
    compatibleMaterial: modifiedCompatibleMaterial,
  };

  // Insert compatibleMaterial property inside each printer

  return { props: { printerFetched: printer } };
};
