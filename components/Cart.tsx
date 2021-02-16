import {
  faChevronDown,
  faChevronUp,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  useCart,
  useDispatchCart,
  useOverlay,
  useUpdateOverlay,
} from './PrintersContext';

export const Cart: React.FC = () => {
  const overlayActive = useOverlay();
  const toggleOverlay = useUpdateOverlay();
  const cartState = useCart();
  const dispatch = useDispatchCart();
  console.log(cartState);

  function calculateTotal() {
    const sumPrice = cartState.cart.reduce((sum, cartItem) => {
      return sum + cartItem.price * cartItem.quantity;
    }, 0);

    return sumPrice;
  }

  return (
    <>
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
          {cartState.cart.map((cartItem) => {
            return (
              <div key={cartItem.id} className="cart-item">
                <img src={cartItem.imgUrl} alt={cartItem.name} />
                <div>
                  <h4>{cartItem.name}</h4>
                  <h5>{cartItem.price * cartItem.quantity} €</h5>
                  <span
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
                    icon={faChevronUp}
                    style={{ color: '#3030ec', cursor: 'pointer' }}
                    onClick={() => {
                      dispatch({
                        type: 'INCREMENT_QUANTITY',
                        payload: cartItem.id,
                      });
                    }}
                  />
                  <p className="item-amount">{cartItem.quantity}</p>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    style={{ color: '#3030ec', cursor: 'pointer' }}
                    onClick={() => {
                      dispatch({
                        type: 'DECREMENT_QUANTITY',
                        payload: cartItem.id,
                      });
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart-footer">
          <h3>
            your total: <span className="cart-total">{calculateTotal()} €</span>
          </h3>
          <button className="clear-cart banner-btn">clear cart</button>
        </div>
      </div>
    </>
  );
};
