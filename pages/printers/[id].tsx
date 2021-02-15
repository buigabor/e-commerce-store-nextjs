/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import Layout from '../../components/Layout';
import {
  Printer,
  useCart,
  useDispatchCart,
} from '../../components/PrintersContext';
import { getAllPrintersIds, getPrintersById } from '../api/database';

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

      &:hover {
        background-color: #3535f5;
      }
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
  const [btnClicked, setBtnClicked] = useState(false);
  const cartBtnEl = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatchCart();
  const cart = useCart();
  console.log(cart);

  useEffect(() => {
    setPrinter(printerFetched);
  }, []);

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
      <Layout>
        <div css={printerStyles}>
          <div className="printer-header">
            <div className="printer-header__img">
              <Image width={400} height={400} src={printer.imgUrl} />
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
              <button
                onClick={() => {
                  dispatch({ type: 'ADD_TO_CART', payload: printerFetched });
                }}
                className="printer-header__cta"
              >
                Add To Cart
              </button>
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
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default PrinterComponent;

export async function getStaticPaths() {
  // Return a list of possible value for id
  const printersIdFetched = await getAllPrintersIds();
  let printersId = printersIdFetched.map((printer: Printer) => {
    return { params: { id: String(printer.id) } };
  });
  printersId.splice(printersId.length - 2, 2);
  return {
    paths: printersId,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch necessary data for the blog post using params.id
  const printerFetched = await getPrintersById(params?.id);

  return { props: { printerFetched } };
};
