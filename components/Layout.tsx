/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Cart } from './Cart';
import { Nav } from './Nav';
import { useOverlay, useUpdateOverlay } from './PrintersContext';

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
  }
`;

const Layout: React.FC = ({ children }) => {
  const overlayActive = useOverlay();
  const toggleOverlay = useUpdateOverlay();
  return (
    <>
      <Nav />
      <div>{children}</div>
      <div
        css={overlayStyles}
        style={{ visibility: overlayActive ? 'visible' : 'hidden' }}
        onClick={(e) => {
          if (e.target.classList.contains('css-c2wgtm-overlayStyles')) {
            toggleOverlay();
          }
        }}
      >
        <Cart />
      </div>
    </>
  );
};
export default Layout;
