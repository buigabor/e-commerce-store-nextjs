/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import SearchBar from 'material-ui-search-bar';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { PrinterCard } from '../../components/PrinterCard';
import {
  Printer,
  useDispatchPrinters,
  usePrinters,
} from '../../components/PrintersContext';
import { getCompatibleMatsById, getPrinters } from '../../utils/database';

const printersStyle = css`
  display: grid;
  padding: 0rem 3rem 3rem 3rem;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'filter catalog';

  .catalog {
    grid-area: catalog;
    margin: 0 auto;
    width: 970px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 280px));
    grid-template-rows: repeat(auto-fit, minmax(370px, 370px));
    column-gap: 2rem;
    row-gap: 3rem;
    padding: 2rem;
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
    width: 14rem;
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

  .reset-filter-btn {
    align-self: center;
    color: #fff;
    border-radius: 4px;
    background-color: #5252f2;
    font-weight: 500;
    margin-top: 13px;
    border: none;
    padding: 1rem 2.1rem;
    font-size: 1em;
    max-width: 190px;
    cursor: pointer;
    text-transform: uppercase;
    outline: none;
    pointer-events: all;
    transition: all 0.2s linear;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border: 2px solid transparent;
    &:hover {
      background-color: #fff;
      color: #5252f2;
      border: 2px solid #5252f2;
    }
  }

  .active {
    background-color: #5252f2;
    color: #fff;
  }
`;

const searchBarStyles = css`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    min-width: 575px;
  }
`;

interface PrintersProps {
  printersFetched: Printer[];
  // compatibleMaterialsFetched: string[];
}

const Printers = ({ printersFetched }: PrintersProps) => {
  const dispatch = useDispatchPrinters();
  const printersState = usePrinters();
  const [matFilterActive, setMatFilterActive] = useState<boolean>(false);
  const [techFilterActive, setTechFilterActive] = useState<boolean>(false);
  const [priceFilterActive, setPriceFilterActive] = useState<boolean>(false);
  const [price, setPrice] = useState<number[]>([0, 3000]);
  const [matFilterTags, setMatFilterTags] = useState<string[]>([]);
  const [techFilterTags, setTechFilterTags] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  const allMatTags = [
    'Metal',
    'Wood',
    'Nylon',
    'TPU',
    'ABS',
    'Resin',
    'Carbon',
  ];
  const allTechTags = ['FDM', 'SLS', 'SLA', 'Polyjet'];

  const [checkboxesChecked, setCheckboxesChecked] = useState({
    Metal: false,
    Wood: false,
    Nylon: false,
    TPU: false,
    ABS: false,
    Resin: false,
    Carbon: false,
    FDM: false,
    SLS: false,
    SLA: false,
    Polyjet: false,
  });

  useEffect(() => {
    dispatch({
      type: 'GET_PRINTERS',
      payload: printersFetched,
    });
    if (!printersFetched) {
      return dispatch({
        type: 'GET_PRINTERS_FAIL',
        payload: 'An error occured while fetching the printers.',
      });
    } else {
      // Set printers in PrintersContext
      return dispatch({
        type: 'GET_PRINTERS_SUCCESS',
        payload: printersFetched,
      });
    }
  }, []);

  useEffect(() => {
    const filterOptions = {
      matFilterTags,
      techFilterTags,
      priceFilterTags: price,
    };

    dispatch({
      type: 'FILTER',
      payload: filterOptions,
    });
  }, [matFilterTags, techFilterTags, price]);

  const handleResetFilter = () => {
    setCheckboxesChecked({
      ...checkboxesChecked,
      Metal: false,
      Wood: false,
      Nylon: false,
      TPU: false,
      ABS: false,
      Resin: false,
      Carbon: false,
      FDM: false,
      SLS: false,
      SLA: false,
      Polyjet: false,
    });
    setMatFilterActive(false);
    setTechFilterActive(false);
    setPriceFilterActive(false);
    setPrice([0, 3000]);
    setMatFilterTags([]);
    setTechFilterTags([]);
  };

  const filterActive = () => {
    let result = false;
    for (let key in checkboxesChecked) {
      if ((checkboxesChecked as any)[key] === true) {
        result = true;
        break;
      }
    }
    if (price[0] !== 0 || price[1] !== 3000) {
      result = true;
    }
    if (searchText) {
      result = true;
    }
    return result;
  };

  const handlePriceChange = (event: any, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  };

  const handleTechCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckboxesChecked({
      ...checkboxesChecked,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked && allTechTags.includes(event.target.name)) {
      return setTechFilterTags([...techFilterTags, event.target.name]);
    } else if (
      !event.target.checked &&
      allTechTags.includes(event.target.name)
    ) {
      return setTechFilterTags(
        techFilterTags.filter((filterTag) => filterTag !== event.target.name),
      );
    }
  };

  const handleMatCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckboxesChecked({
      ...checkboxesChecked,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked && allMatTags.includes(event.target.name)) {
      return setMatFilterTags([...matFilterTags, event.target.name]);
    } else if (
      !event.target.checked &&
      allMatTags.includes(event.target.name)
    ) {
      return setMatFilterTags(
        matFilterTags.filter((filterTag) => filterTag !== event.target.name),
      );
    }
  };

  const handleSearch = (newValue: string) => {
    setSearchText(newValue);
    dispatch({ type: 'SEARCH', payload: newValue });
  };

  function valuetext(value: number) {
    return `${value} €`;
  }

  if (!printersState.error) {
    return (
      <Layout>
        <div css={searchBarStyles}>
          <SearchBar
            onCancelSearch={() => {
              setSearchText('');
            }}
            value={searchText}
            onChange={handleSearch}
            onRequestSearch={() => () => console.log('onRequestSearch')}
          />
        </div>
        <div css={printersStyle}>
          <div className="filter">
            <h2>CATEGORIES</h2>
            <div className="filter-row">
              <div
                className={`filter-row__header ${
                  matFilterActive ? 'border-bottom active' : ''
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
                    checked={checkboxesChecked.Metal}
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    name="Metal"
                    onChange={handleMatCheckboxChange}
                  />
                  Metal
                </p>
                <p>
                  <Checkbox
                    checked={checkboxesChecked.Wood}
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    name="Wood"
                    onChange={handleMatCheckboxChange}
                  />
                  Wood
                </p>
                <p>
                  <Checkbox
                    checked={checkboxesChecked.Nylon}
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    name="Nylon"
                    onChange={handleMatCheckboxChange}
                  />
                  Polyamide Nylon
                </p>
                <p>
                  <Checkbox
                    checked={checkboxesChecked.TPU}
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    name="TPU"
                    onChange={handleMatCheckboxChange}
                  />
                  TPU
                </p>
                <p>
                  <Checkbox
                    checked={checkboxesChecked.ABS}
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    name="ABS"
                    onChange={handleMatCheckboxChange}
                  />
                  ABS
                </p>
                <p>
                  <Checkbox
                    checked={checkboxesChecked.Resin}
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    name="Resin"
                    onChange={handleMatCheckboxChange}
                  />
                  Resin
                </p>
                <p>
                  <Checkbox
                    checked={checkboxesChecked.Carbon}
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    name="Carbon"
                    onChange={handleMatCheckboxChange}
                  />
                  Carbon Fiber
                </p>
              </div>
            </div>
            <div className="filter-row">
              <div
                className={`filter-row__header ${
                  techFilterActive ? 'border-bottom active' : ''
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
                    checked={checkboxesChecked.FDM}
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    name="FDM"
                    onChange={handleTechCheckboxChange}
                  />
                  FDM
                </p>
                <p>
                  <Checkbox
                    checked={checkboxesChecked.SLS}
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    name="SLS"
                    onChange={handleTechCheckboxChange}
                  />
                  SLS
                </p>
                <p>
                  <Checkbox
                    checked={checkboxesChecked.Polyjet}
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    name="Polyjet"
                    onChange={handleTechCheckboxChange}
                  />
                  Polyjet
                </p>
                <p>
                  <Checkbox
                    checked={checkboxesChecked.SLA}
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    name="SLA"
                    onChange={handleTechCheckboxChange}
                  />
                  SLA
                </p>
              </div>
            </div>
            <div className="filter-row">
              <div
                className={`filter-row__header ${
                  priceFilterActive ? 'border-bottom active' : ''
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
                    step={50}
                    max={3000}
                    value={price}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleResetFilter} className="reset-filter-btn">
              Reset Filter
            </button>
          </div>
          <div className="catalog">
            {
              filterActive()
                ? printersState.filteredPrinters.map((printer) => {
                    return <PrinterCard key={printer.id} printer={printer} />;
                  })
                : printersState.printers.map((printer) => {
                    return <PrinterCard key={printer.id} printer={printer} />;
                  })

              //  : (
              //   printersState.printers.map((printer) => {
              //     return <PrinterCard key={printer.id} printer={printer} />;
              //   })
            }
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
  let printersFetched = await getPrinters();

  // Remove last 2 elements (count and SELECT)
  printersFetched.splice(printersFetched.length - 2, 2);

  // Insert compatibleMaterial property inside each printer
  let printers: Printer[] = await Promise.all(
    printersFetched.map(async (printer: any) => {
      return {
        ...printer,
        compatibleMaterial: await getCompatibleMatsById(printer.id),
      };
    }),
  );

  // Get all the name of mats
  let printerWithCompatibleMats = printers.map((printer) => {
    return {
      ...printer,
      compatibleMaterial: printer.compatibleMaterial?.map(
        (mat: any) => mat.name,
      ),
    };
  });

  return { props: { printersFetched: printerWithCompatibleMats } };
}

export default Printers;
