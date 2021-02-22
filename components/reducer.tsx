const initialCartState = {
  cart: [],
};

export const initiateCartState = () => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(cart);
  }

  return initialCartState;
};
