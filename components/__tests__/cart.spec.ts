/// <reference types="jest" />

import { calcTotalNumberOfItems, calculateTotal } from '../../utils/cart';
import { cartReducer, CartState } from '../CartContext';

export {};

const initialCartState = {
  cart: [],
};

const product = {
  id: 1,
  name: 'test',
  type: 'type',
};

const productToUpdate = {
  id: 'm-1',
  name: 'test',
  type: 'type',
  quantity: 2,
  price: 0,
};

const cartState: CartState = {
  cart: [
    { id: 'm-1', quantity: 5, price: 300, type: '', name: '' },
    { id: 'm-2', quantity: 2, price: 1000, type: '', name: '' },
  ],
};

test('it should return the initial state', () => {
  localStorage.setItem('cart', JSON.stringify([]));
  expect(cartReducer(initialCartState, { type: '', payload: undefined })).toBe(
    initialCartState,
  );
});

test('it should add and remove a product', () => {
  localStorage.setItem('cart', JSON.stringify([]));

  expect(
    cartReducer(initialCartState, { type: 'ADD_TO_CART', payload: product }),
  ).toMatchObject({ cart: [product] });

  expect(JSON.parse(localStorage.cart)).toMatchObject({ cart: [product] });

  expect(
    cartReducer(initialCartState, {
      type: 'REMOVE_FROM_CART',
      payload: 1,
    }),
  ).toMatchObject({ cart: [] });
});

test('it should update quantity of a product', () => {
  localStorage.setItem('cart', JSON.stringify([]));

  expect(
    cartReducer(initialCartState, { type: 'ADD_TO_CART', payload: product }),
  ).toMatchObject({ cart: [product] });

  expect(JSON.parse(localStorage.cart)).toMatchObject({ cart: [product] });

  expect(
    cartReducer(
      { cart: [productToUpdate] },
      {
        type: 'INCREMENT_QUANTITY',
        payload: 'm-1',
      },
    ),
  ).toMatchObject({ cart: [{ ...productToUpdate, quantity: 3 }] });

  expect(JSON.parse(localStorage.cart)).toMatchObject({
    cart: [{ ...productToUpdate, quantity: 3 }],
  });

  expect(
    cartReducer(
      { cart: [productToUpdate] },
      {
        type: 'DECREMENT_QUANTITY',
        payload: 'm-1',
      },
    ),
  ).toMatchObject({ cart: [{ ...productToUpdate, quantity: 2 }] });

  expect(JSON.parse(localStorage.cart)).toMatchObject({
    cart: [{ ...productToUpdate, quantity: 2 }],
  });

  expect(
    cartReducer(
      { cart: [productToUpdate] },
      {
        type: 'CLEAR_CART',
        payload: '',
      },
    ),
  ).toMatchObject({ cart: [] });

  expect(JSON.parse(localStorage.cart)).toMatchObject({
    cart: [],
  });
});

test('it should sum the quantity and price of cart', () => {
  expect(calculateTotal(cartState)).toBe(3500);

  expect(calcTotalNumberOfItems(cartState)).toBe(7);
});
