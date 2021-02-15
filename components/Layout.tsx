/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  faChevronDown,
  faChevronUp,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
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
    background: rgb(250, 244, 244);
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
      letter-spacing: var.$mainSpacing;
    }

    h5 {
      margin: 0.5rem 0;
      letter-spacing: var.$mainSpacing;
    }
  }

  .item-amount {
    text-align: center;
  }

  .remove-item {
    color: grey;
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
      >
        <div
          style={{
            transform: overlayActive ? 'translateX(0%)' : 'translateX(100%)',
          }}
          className="cart"
        >
          <span className="close-cart">
            <FontAwesomeIcon
              icon={faWindowClose}
              onClick={() => {
                toggleOverlay();
              }}
            />
          </span>
          <h2>Your Cart</h2>
          <div className="cart-content">
            <div className="cart-item">
              <img src="./images/product-1.jpeg" alt="product" />
              <div>
                <h4>queen bed</h4>
                <h5>$9.00</h5>
                <span className="remove-item">remove</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faChevronUp} />
                <p className="item-amount">1</p>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
          </div>

          <div className="cart-footer">
            <h3>
              your total: $ <span className="cart-total">0</span>
            </h3>
            <button className="clear-cart banner-btn">clear cart</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Layout;
