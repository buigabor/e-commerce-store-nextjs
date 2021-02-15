/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../components/Layout';
import { PrinterCard } from '../../components/Printer';
import {
  Printer,
  useDispatchCart,
  useDispatchPrinters,
  useOverlay,
  usePrinters,
  useUpdateOverlay,
} from '../../components/PrintersContext';
import { getPrinters } from '../api/database';

const printersStyle = css`
  display: grid;
  padding: 4rem;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'filter catalog';

  .catalog {
    grid-area: catalog;
    margin: 0 auto;
    max-width: 1170px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    column-gap: 2rem;
    row-gap: 3rem;
    padding: 3rem;
  }

  .product {
    border: 1px solid rgba(179, 179, 179, 0.479);
    padding: 1.5rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 1rem;
    cursor: pointer;
    &-img {
      display: block;
      width: 100%;
      min-height: 12rem;
      transition: all 0.2s linear;
    }

    h3 {
      text-transform: capitalize;
      font-size: 1.1rem;
      margin-top: 1rem;
      letter-spacing: 0.1rem;
      text-align: center;
    }

    h4 {
      margin-top: 0.7rem;
      margin-bottom: 0;
      letter-spacing: 0.1rem;
      color: #3030ec;
      text-align: center;
    }
  }

  .img-container {
    position: relative;
    overflow: hidden;

    &:hover {
      .product-img {
        opacity: 0.5;
      }

      .bag-btn {
        transform: translateX(0);
      }
    }
  }

  .bag-btn {
    position: absolute;
    top: 70%;
    right: 0;
    background: #5252f2;
    color: #fff;
    border: none;
    text-transform: uppercase;
    padding: 0.5rem 0.75rem;
    letter-spacing: 0.1rem;
    font-weight: bold;
    transition: all 0.2s ease-in;
    transform: translateX(101%);
    cursor: pointer;
    outline: none;

    &:hover {
      background: #2525f8;
    }
  }

  .filter {
    grid-area: filter;
    width: 12rem;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    h2 {
      color: #000;
    }
    &-row:first-of-type {
      border: 1px solid gray;
    }
    &-row:not(:first-of-type) {
      border-bottom: 1px solid gray;
      border-right: 1px solid gray;
      border-left: 1px solid gray;
    }
    &-row {
      cursor: pointer;
      &__header {
        color: #163347;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.8rem 0.8rem;
        text-transform: uppercase;
      }
    }

    &-icon {
      font-size: 1.6em;
    }

    &-dropdown-content {
      display: none;
      z-index: 1;
      margin: 0;
      p {
        margin: 5px 15px;
        color: #163347;
        line-height: 26px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 0.5rem;
      }
      p:last-child {
        margin-bottom: 0;
      }
    }
  }
  .show {
    display: block;
  }

  .border-bottom {
    border-bottom: 1px solid gray;
  }
  .slider {
    padding: 0.5rem 1rem;
  }
`;

interface PrintersProps {
  printersFetched: Printer[];
}

const Printers = ({ printersFetched }: PrintersProps) => {
  const dispatch = useDispatchPrinters();
  const printers = usePrinters();
  const [matFilterActive, setMatFilterActive] = useState<boolean>(false);
  const [techFilterActive, setTechFilterActive] = useState<boolean>(false);
  const [priceFilterActive, setPriceFilterActive] = useState<boolean>(false);
  const [price, setPrice] = useState<number[] | number>([300, 1200]);
  const [btnClicked, setBtnClicked] = useState(false);
  const cartBtnEl = useRef<HTMLButtonElement>(null);
  const dispatchCart = useDispatchCart();
  const overlayActive = useOverlay();
  const toggleOverlay = useUpdateOverlay();

  useEffect(() => {
    // Remove last 2 elements
    printersFetched.splice(printersFetched.length - 2, 2);
    // Set printers in PrintersContext
    dispatch({
      type: 'GET_PRINTERS',
      payload: printersFetched,
    });
  }, []);

  const handleChange = (event: any, newValue: number | number[]) => {
    setPrice(newValue);
  };

  function valuetext(value: number) {
    return `${value} €`;
  }

  if (printers.length > 0) {
    console.log(printers);

    return (
      <Layout>
        <div css={printersStyle}>
          <div className="filter">
            <h2>CATEGORIES</h2>
            <div className="filter-row">
              <div
                className={`filter-row__header ${
                  matFilterActive ? 'border-bottom' : ''
                }`}
                onClick={() => {
                  setMatFilterActive(!matFilterActive);
                }}
              >
                {' '}
                Material{' '}
                <FontAwesomeIcon className="filter-icon" icon={faCaretDown} />
              </div>
              <div
                className={`filter-dropdown-content ${
                  matFilterActive ? 'show' : ''
                }`}
              >
                <p>
                  <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                  Link 1
                </p>
                <p>
                  <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                  Link 2
                </p>
                <p>
                  <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                  Link 3
                </p>
              </div>
            </div>
            <div className="filter-row">
              <div
                className={`filter-row__header ${
                  techFilterActive ? 'border-bottom' : ''
                }`}
                onClick={() => {
                  setTechFilterActive(!techFilterActive);
                }}
              >
                {' '}
                Technology{' '}
                <FontAwesomeIcon className="filter-icon" icon={faCaretDown} />
              </div>
              <div
                className={`filter-dropdown-content ${
                  techFilterActive ? 'show' : ''
                }`}
              >
                <p>
                  <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                  Link 1
                </p>
                <p>
                  <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                  Link 2
                </p>
                <p>
                  <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                  Link 3
                </p>
              </div>
            </div>
            <div className="filter-row">
              <div
                className={`filter-row__header ${
                  priceFilterActive ? 'border-bottom' : ''
                }`}
                onClick={() => {
                  setPriceFilterActive(!priceFilterActive);
                }}
              >
                {' '}
                Price{' '}
                <FontAwesomeIcon className="filter-icon" icon={faCaretDown} />
              </div>
              <div
                className={`filter-dropdown-content ${
                  priceFilterActive ? 'show' : ''
                }`}
              >
                <Typography id="range-slider" gutterBottom>
                  Price range (€)
                </Typography>
                <div className="slider">
                  <Slider
                    max={3000}
                    value={price}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="catalog">
            {printers.map((printer) => {
              return <PrinterCard printer={printer} />;
            })}
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }
};

export async function getStaticProps() {
  // Get printers from PG database
  const printersFetched = await getPrinters();

  return { props: { printersFetched } };
}

export default Printers;
