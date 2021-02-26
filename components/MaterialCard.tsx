import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import slugify from 'slugify';
import { useCart, useDispatchCart } from './CartContext';
import { Material } from './MaterialsContext';
import { useUpdateOverlay } from './OverlayContext';

interface MaterialProps {
  material: Material;
}

export const MaterialCard = ({ material }: MaterialProps) => {
  const dispatchCart = useDispatchCart();
  const toggleOverlay = useUpdateOverlay();
  const cartState = useCart();

  function checkIfInCart() {
    return cartState.cart.some((cartItem) => {
      return cartItem.id === material.id;
    });
  }

  return (
    <>
      <article className="product">
        <Link href={'/materials/' + material.id}>
          <div className="img-container">
            <img
              src={`/productImages/${slugify(material.name)}.jpg`}
              alt="Product 1"
              className="product-img"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleOverlay();
                dispatchCart({
                  type: 'ADD_TO_CART',
                  payload: { ...material, quantity: 1 },
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
        <h3>{material.name}</h3>
        <h4>{material.price} €</h4>
      </article>
    </>
  );
};
