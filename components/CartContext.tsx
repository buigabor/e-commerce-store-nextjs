import {
  createContext,
  Dispatch,
  Reducer,
  useContext,
  useReducer,
} from 'react';
import { Material } from './MaterialsContext';
import { Printer } from './PrintersContext';

const initialCartState = {
  cart: [],
};

export interface CartState {
  cart: (CartPrinterItem | CartMaterialItem)[];
}

export interface CartPrinterItem extends Printer {
  quantity: number;
}

export interface CartMaterialItem extends Material {
  quantity: number;
}

interface ActionCart {
  type: string;
  payload: any;
}

export const handleQuantity = (
  state: CartState,
  action: ActionCart,
  mode: string,
): (CartPrinterItem | CartMaterialItem)[] => {
  if (mode === 'add') {
    return state.cart.map((printer) => {
      if (printer.id === action.payload) {
        printer.quantity += 1;
        return { ...printer };
      }
      return { ...printer };
    });
  } else if (mode === 'subtract') {
    return state.cart
      .map((printer) => {
        if (printer.id === action.payload) {
          printer.quantity -= 1;
          return { ...printer };
        }
        return { ...printer };
      })
      .filter((printer) => {
        return printer.quantity >= 0;
      });
  } else {
    return { ...state, ...state.cart };
  }
};

export const cartReducer: Reducer<CartState, ActionCart> = (
  state: CartState,
  action: ActionCart,
): CartState => {
  let cart = JSON.parse(localStorage.cart);
  switch (action.type) {
    case 'SET_INITIAL_CART':
      return { ...state, ...action.payload };
    case 'ADD_TO_CART':
      cart = { ...state, cart: [...state.cart, action.payload] };
      localStorage.setItem('cart', JSON.stringify(cart));
      return { ...state, cart: [...state.cart, action.payload] };
    case 'INCREMENT_QUANTITY':
      const cartQtyIncremented = handleQuantity(state, action, 'add');
      cart = { ...state, cart: cartQtyIncremented };
      localStorage.setItem('cart', JSON.stringify(cart));
      return { ...state, cart: cartQtyIncremented };
    case 'DECREMENT_QUANTITY':
      const cartQtyDecremented = handleQuantity(state, action, 'subtract');
      cart = { ...state, cart: cartQtyDecremented };
      localStorage.setItem('cart', JSON.stringify(cart));
      return { ...state, cart: cartQtyDecremented };
    case 'REMOVE_FROM_CART':
      cart = {
        ...state,
        cart: state.cart.filter((printer) => {
          return printer.id !== action.payload;
        }),
      };
      localStorage.setItem('cart', JSON.stringify(cart));
      return {
        ...state,
        cart: state.cart.filter((printer) => {
          return printer.id !== action.payload;
        }),
      };
    case 'CLEAR_CART':
      cart = { ...state, cart: [] };
      localStorage.setItem('cart', JSON.stringify(cart));
      return { ...state, cart: [] };
    default:
      return state;
  }
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const CartStateContext = createContext<CartState>(initialCartState);
// eslint-disable-next-line @typescript-eslint/naming-convention
const CartDispatchContext = createContext<Dispatch<ActionCart>>(() => null);

const CartProvider: React.FC = ({ children }) => {
  const [cart, dispatchCart] = useReducer(cartReducer, initialCartState);
  return (
    <CartDispatchContext.Provider value={dispatchCart}>
      <CartStateContext.Provider value={cart}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
