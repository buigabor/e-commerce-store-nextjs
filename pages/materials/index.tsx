/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { MaterialCard } from '../../components/MaterialCard';
import {
  Material,
  useDispatchMaterials,
  useMaterials,
} from '../../components/PrintersContext';
import { getMaterials } from '../api/database';

const materialsStyle = css`
  display: grid;
  padding: 3rem;
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

interface MaterialsProps {
  materialsFetched: Material[];
}

const Materials = ({ materialsFetched }: MaterialsProps) => {
  const dispatch = useDispatchMaterials();
  const materialsState = useMaterials();
  const [typeFilterActive, setTypeFilterActive] = useState<boolean>(false);
  const [priceFilterActive, setPriceFilterActive] = useState<boolean>(false);
  const [price, setPrice] = useState<number[]>([0, 1000]);
  const [typeFilterTags, setTypeFilterTags] = useState<string[]>([]);
  const [checkboxesChecked, setCheckboxesChecked] = useState({
    Filament: false,
    Powder: false,
    Liquid: false,
  });

  const filterActive = () => {
    let result = false;
    for (let key in checkboxesChecked) {
      if ((checkboxesChecked as any)[key] === true) {
        result = true;
        break;
      }
    }
    if (price[0] !== 0 || price[1] !== 1000) {
      result = true;
    }
    return result;
  };

  const allTypeTags = ['Filament', 'Liquid', 'Powder'];

  useEffect(() => {
    const filterOptions = {
      typeFilterTags,
      priceFilterTags: price,
    };

    dispatch({
      type: 'FILTER',
      payload: filterOptions,
    });
    console.log('dispatched filter');
  }, [typeFilterTags, price]);

  useEffect(() => {
    // Remove last 2 elements
    materialsFetched.splice(materialsFetched.length - 2, 2);
    dispatch({ type: 'GET_MATERIALS', payload: materialsFetched });
  }, []);

  const handleTypeCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckboxesChecked({
      ...checkboxesChecked,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked && allTypeTags.includes(event.target.name)) {
      return setTypeFilterTags([...typeFilterTags, event.target.name]);
    } else if (
      !event.target.checked &&
      allTypeTags.includes(event.target.name)
    ) {
      return setTypeFilterTags(
        typeFilterTags.filter((filterTag) => filterTag !== event.target.name),
      );
    }
  };

  const handlePriceChange = (event: any, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  };

  function valuetext(value: number) {
    return `${value} €`;
  }

  const handleResetFilter = () => {
    setTypeFilterActive(false);
    setPriceFilterActive(false);
    setTypeFilterTags([]);
    setCheckboxesChecked({ Filament: false, Powder: false, Liquid: false });
    setPrice([0, 1000]);
  };
  if (!materialsState.error) {
    return (
      <Layout>
        <div css={materialsStyle}>
          <div className="filter">
            <h2>CATEGORIES</h2>
            <div className="filter-row">
              <div
                className={`filter-row__header ${
                  typeFilterActive ? 'border-bottom active' : ''
                }`}
                onClick={() => {
                  setTypeFilterActive(!typeFilterActive);
                }}
              >
                {' '}
                Type{' '}
                <FontAwesomeIcon className="filter-icon" icon={faCaretDown} />
              </div>
              <div
                className={`filter-dropdown-content ${
                  typeFilterActive ? 'show' : ''
                }`}
              >
                <p>
                  <Checkbox
                    checked={checkboxesChecked.Filament}
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    name="Filament"
                    onChange={handleTypeCheckboxChange}
                  />
                  Filament
                </p>
                <p>
                  <Checkbox
                    checked={checkboxesChecked.Liquid}
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    name="Liquid"
                    onChange={handleTypeCheckboxChange}
                  />
                  Liquid
                </p>
                <p>
                  <Checkbox
                    checked={checkboxesChecked.Powder}
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    name="Powder"
                    onChange={handleTypeCheckboxChange}
                  />
                  Powder
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
                    max={1000}
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
                ? materialsState.filteredMaterials.map((material) => {
                    return (
                      <MaterialCard key={material.id} material={material} />
                    );
                  })
                : materialsState.materials.map((material) => {
                    return (
                      <MaterialCard key={material.id} material={material} />
                    );
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

export default Materials;

export async function getStaticProps() {
  // Get materials from PG database
  const materialsFetched = await getMaterials();

  return { props: { materialsFetched } };
}
