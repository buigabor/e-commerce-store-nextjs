/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useCart, useUpdateOverlay } from './PrintersContext';

const navStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #000;
  color: #fff;
  height: 10vh;

  .logo {
    cursor: pointer;
  }

  .links {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-basis: 30%;

    div {
      a {
        padding: 1.31rem 1rem;
        margin: 0 0.6rem;
        transition: all 0.25s ease-in-out;
        border-bottom: 3px solid transparent;
        &:hover {
          border-bottom: 3.2px solid #5252f2;
        }
      }
    }
  }

  .logo {
    display: flex;
    align-items: center;
    &-img {
      position: relative;
      top: 7px;
    }
    color: #fff;
    margin-left: 10px;
    span {
      font-weight: 600;
      font-family: 'Syncopate', sans-serif;
    }
  }

  .cart {
    margin-right: 1rem;
    font-size: 20px;
    cursor: pointer;
    transform: translateX(-1rem);
    display: flex;
    align-items: center;
    svg {
      margin: 0 1.1rem;
    }
    &-items {
      position: absolute;
      top: -8px;
      right: 3.5rem;
      background: #5252f2;
      padding: 0 5px;
      border-radius: 30%;
      color: #fff;
      font-size: 0.85em;
    }
  }
`;

export const Nav = () => {
  const cartState = useCart();
  const toggleOverlay = useUpdateOverlay();

  function calcTotalNumberOfItems() {
    const sumPrice = cartState.cart.reduce((quantity, cartItem) => {
      return quantity + cartItem.quantity;
    }, 0);

    return sumPrice;
  }

  return (
    <div css={navStyles}>
      <Link href="/">
        <div className="logo">
          <div className="logo-img">
            <Image width={60} height={60} src="/3Dlogo.svg" />
          </div>
          <span>3D BUIG</span>
        </div>
      </Link>
      <div className="links">
        <div>
          <Link href="/printers">
            <a> 3D Printers</a>
          </Link>
        </div>
        <div>
          <Link href="/materials">
            <a>Materials</a>
          </Link>
        </div>
        <div>
          <Link href="/about">
            <a>About</a>
          </Link>
        </div>
      </div>
      <div className="cart">
        <div>
          <FontAwesomeIcon
            icon={faShoppingCart}
            onClick={() => {
              toggleOverlay();
            }}
          />
          <div
            onClick={() => {
              toggleOverlay();
            }}
            className="cart-items"
          >
            {calcTotalNumberOfItems()}
          </div>
        </div>
        <FontAwesomeIcon icon={faUser} />
      </div>
    </div>
  );
};
