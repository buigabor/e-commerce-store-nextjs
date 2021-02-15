import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useState } from 'react';
import { Printer, useDispatchCart, useUpdateOverlay } from './PrintersContext';

interface PrinterProps {
  printer: Printer;
}

export const PrinterCard = ({ printer }: PrinterProps) => {
  const [disabled, setDisabled] = useState(false);
  const dispatchCart = useDispatchCart();
  const toggleOverlay = useUpdateOverlay();
  return (
    <>
      <article key={printer.id} className="product">
        <Link href={'/printers/' + printer.id}>
          <div className="img-container">
            <img src={printer.imgUrl} alt="Product 1" className="product-img" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleOverlay();
                setDisabled(true);
                dispatchCart({
                  type: 'ADD_TO_CART',
                  payload: { ...printer, quantity: 1 },
                });
              }}
              className="bag-btn"
              disabled={disabled}
              style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
            >
              <FontAwesomeIcon
                style={{ display: disabled ? 'none' : 'inline-block' }}
                icon={faShoppingCart}
              />{' '}
              {disabled ? 'In Cart' : 'Add To Cart'}
            </button>
          </div>
        </Link>
        <h3>{printer.name}</h3>
        <h4>{printer.price} €</h4>
      </article>
    </>
  );
};
