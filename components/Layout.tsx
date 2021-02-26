/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import { Cart } from './Cart';
import { useDispatchCart } from './CartContext';
import { Nav } from './Nav';
import { useOverlay, useUpdateOverlay } from './OverlayContext';

const overlayStyles = css`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  transition: all 0.2s linear;
  background: rgba(82, 82, 242, 0.5);
  z-index: 2;
  visibility: hidden;

  .cart {
    position: fixed;
    top: 0;
    right: 0;
    width: 35%;
    height: 100%;
    overflow: scroll;
    z-index: 4;
    background: rgb(255, 255, 255);
    padding: 1.5rem;
    transition: all 0.2s linear;
    transform: translateX(100%);

    h2 {
      pointer-events: none;
      text-transform: capitalize;
      text-align: center;
      letter-spacing: 0.1rem;
      margin-bottom: 2rem;
    }

    &-footer {
      margin-top: 2rem;
      letter-spacing: 0.1rem;
      text-align: center;

      h3 {
        text-transform: capitalize;
        margin-bottom: 1rem;
      }
    }
  }

  .showCart {
    transform: translateX(0);
  }

  .transparentBcg {
    visibility: visible;
  }
  .close-cart {
    font-size: 1.7rem;
    cursor: pointer;
    pointer-events: all;
  }

  /*---------- Cart Item -------------------- */

  .cart-item {
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    -moz-column-gap: 1.5rem;
    column-gap: 1.5rem;
    margin: 1.5rem 0;

    img {
      width: 75px;
      height: 75px;
    }

    h4 {
      font-size: 0.85rem;
      text-transform: capitalize;
      letter-spacing: 0.1rem;
    }

    h5 {
      margin: 0.5rem 0;
      letter-spacing: 0.1rem;
    }
  }

  .item-amount {
    text-align: center;
    margin: 3px 0;
  }

  .remove-item {
    color: #929191 /* color: #fa6363; */;
    cursor: pointer;
    pointer-events: all;
  }

  .clear-cart {
    color: #fff;
    border-radius: 4px;
    background-color: #f5534f;
    font-weight: 500;
    margin-top: 13px;
    border: none;
    padding: 1rem 2.2rem;
    font-size: 1.1em;
    max-width: 250px;
    cursor: pointer;
    text-transform: uppercase;
    outline: none;
    pointer-events: all;
    transition: all 0.2s linear;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    &:hover {
      background-color: #fb706e;
    }
  }

  .checkout {
    color: #fff;
    border-radius: 4px;
    background-color: #5252f2;
    font-weight: 500;
    margin-top: 13px;
    border: none;
    padding: 1rem 2.6rem;
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
  .cart-btn-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .cart-footer {
    pointer-events: none;
  }
  .cart-content {
    pointer-events: none;
  }

  .arrow,
  .arrow {
    pointer-events: all;
  }
`;

const Layout: React.FC = ({ children }) => {
  const overlayActive = useOverlay();
  const toggleOverlay = useUpdateOverlay();
  const dispatch = useDispatchCart();

  useEffect(() => {
    let cart = localStorage.getItem('cart');
    if (cart) {
      dispatch({ type: 'SET_INITIAL_CART', payload: JSON.parse(cart) });
    }
  }, []);

  useEffect(() => {
    if (!localStorage.cart) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }, []);

  return (
    <>
      <Nav />
      <div>{children}</div>
      <div
        css={overlayStyles}
        className="overlay"
        style={{ visibility: overlayActive ? 'visible' : 'hidden' }}
        onClick={(e) => {
          if (e.target.classList.contains('overlay')) {
            return toggleOverlay();
          }
        }}
      >
        <Cart />
      </div>
    </>
  );
};
export default Layout;
