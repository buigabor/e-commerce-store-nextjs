import { CartState } from '../components/CartContext';

export function calculateTotal(cartStateArg: CartState) {
  const sumPrice = cartStateArg?.cart?.reduce((sum, cartItem) => {
    return sum + cartItem.price * cartItem.quantity;
  }, 0);

  return sumPrice;
}

export function calcTotalNumberOfItems(cartStateArg: CartState) {
  const sumPrice = cartStateArg?.cart?.reduce((quantity, cartItem) => {
    return quantity + cartItem.quantity;
  }, 0);

  return sumPrice;
}
