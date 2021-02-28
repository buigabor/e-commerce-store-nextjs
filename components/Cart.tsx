import {
  faChevronDown,
  faChevronUp,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import slugify from 'slugify';
import { calculateTotal } from '../utils/cart';
import { useCart, useDispatchCart } from './CartContext';
import { useOverlay, useUpdateOverlay } from './OverlayContext';

export const Cart: React.FC = () => {
  const overlayActive = useOverlay();
  const toggleOverlay = useUpdateOverlay();
  const cartState = useCart();

  const dispatch = useDispatchCart();

  return (
    <>
      <div
        style={{
          transform: overlayActive ? 'translateX(0%)' : 'translateX(100%)',
        }}
        className="cart"
        data-cy="cart"
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
          {cartState?.cart?.map((cartItem) => {
            return (
              <div key={cartItem.id} className="cart-item">
                <img
                  src={`/productImages/${slugify(cartItem.name)}.jpg`}
                  alt={cartItem.name}
                />
                <div>
                  <h4>{cartItem.name}</h4>
                  <h5>{cartItem.price * cartItem.quantity} €</h5>
                  <span
                    data-cy="cart-remove-btn"
                    className="remove-item"
                    onClick={() => {
                      dispatch({
                        type: 'REMOVE_FROM_CART',
                        payload: cartItem.id,
                      });
                    }}
                  >
                    remove
                  </span>
                </div>
                <div>
                  <FontAwesomeIcon
                    data-cy="cart-increment-btn"
                    className="arrow"
                    icon={faChevronUp}
                    style={{ color: '#3030ec', cursor: 'pointer' }}
                    onClick={() => {
                      dispatch({
                        type: 'INCREMENT_QUANTITY',
                        payload: cartItem.id,
                      });
                    }}
                  />
                  <p
                    data-cy="cart-product-quantity-text"
                    className="item-amount"
                  >
                    {cartItem.quantity}
                  </p>
                  <FontAwesomeIcon
                    data-cy="cart-decrement-btn"
                    icon={faChevronDown}
                    style={{ color: '#3030ec', cursor: 'pointer' }}
                    onClick={() => {
                      dispatch({
                        type: 'DECREMENT_QUANTITY',
                        payload: cartItem.id,
                      });
                    }}
                    className="arrow"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart-footer">
          <h3>
            your total:{' '}
            <span className="cart-total">{calculateTotal(cartState)} €</span>
          </h3>
          <div className="cart-btn-wrapper">
            <Link href="/checkout">
              <button
                data-cy="cart-checkout-btn"
                onClick={() => {
                  toggleOverlay();
                }}
                className="checkout"
              >
                Checkout
              </button>
            </Link>
            <button
              data-cy="cart-clear-btn"
              className="clear-cart"
              onClick={() => {
                dispatch({
                  type: 'CLEAR_CART',
                  payload: null,
                });
              }}
            >
              clear cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
