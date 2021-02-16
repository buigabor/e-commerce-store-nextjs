import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import slugify from 'slugify';
import {
  CartItem,
  Printer,
  useCart,
  useDispatchCart,
  useUpdateOverlay,
} from './PrintersContext';

interface PrinterProps {
  printer: Printer;
}

export const PrinterCard = ({ printer }: PrinterProps) => {
  const dispatchCart = useDispatchCart();
  const toggleOverlay = useUpdateOverlay();
  const cartState = useCart();

  function checkIfInCart() {
    return cartState.cart.some((cartItem: CartItem) => {
      return cartItem.id === printer.id;
    });
  }
  console.log(slugify(printer.name));

  return (
    <>
      <article className="product">
        <Link href={'/printers/' + printer.id}>
          <div className="img-container">
            <img
              src={`/printerImages/${slugify(printer.name)}.jpg`}
              alt="Product 1"
              className="product-img"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleOverlay();
                dispatchCart({
                  type: 'ADD_TO_CART',
                  payload: { ...printer, quantity: 1 },
                });
              }}
              className="bag-btn"
              disabled={checkIfInCart() ? true : false}
              style={{ cursor: checkIfInCart() ? 'not-allowed' : 'pointer' }}
            >
              <FontAwesomeIcon
                style={{ display: checkIfInCart() ? 'none' : 'inline-block' }}
                icon={faShoppingCart}
              />{' '}
              {checkIfInCart() ? 'In Cart' : 'Add To Cart'}
            </button>
          </div>
        </Link>
        <h3>{printer.name}</h3>
        <h4>{printer.price} €</h4>
      </article>
    </>
  );
};
