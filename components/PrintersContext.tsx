import {
  createContext,
  Dispatch,
  useContext,
  useReducer,
  useState,
} from 'react';

export interface PrinterState {
  printers: Printer[];
  loading: boolean;
  error: null | string;
}

export interface CartState {
  cart: CartItem[];
}

const initialPrinterState = {
  printers: [],
  loading: false,
  error: null,
};

const initialCartState = {
  cart: [],
};

const PrinterStateContext = createContext<PrinterState>(initialPrinterState);
const PrinterDispatchContext = createContext<Dispatch<ActionPrinters>>(
  () => null,
);
const OverlayContext = createContext<boolean>(false);
const UpdateOverlayContext = createContext(() => {});
const CartStateContext = createContext<CartState>(initialCartState);
const CartDispatchContext = createContext<Dispatch<ActionCart>>(() => null);

export interface CartItem extends Printer {
  quantity: number;
}

export interface Printer {
  id: number;
  name: string;
  technology: string;
  printingSpeed: string;
  fileFormat: string;
  description: string;
  imgUrl: string;
  price: number;
  compatibleMaterial: string[];
  printingSize: string;
  videoUrl: string;
}
interface ActionPrinters {
  type: string;
  payload: Printer[];
}

interface ActionCart {
  type: string;
  payload: any;
}

type Reducer<S, A> = (prevState: S, action: A) => S;

const printersReducer: Reducer<PrinterState, ActionPrinters> = (
  state: PrinterState,
  action: ActionPrinters,
) => {
  switch (action.type) {
    case 'GET_PRINTERS':
      return { ...state, printers: [...action.payload] };
    default:
      return state;
  }
};

const handleQuantity = (
  state: CartState,
  action: ActionCart,
  mode: string,
): CartItem[] => {
  if (mode === 'add') {
    return state.cart.map((printer: CartItem) => {
      if (printer.id === action.payload) {
        printer.quantity += 1;
        return { ...printer };
      }
      return { ...printer };
    });
  } else if (mode === 'subtract') {
    return state.cart
      .map((printer: CartItem) => {
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

const cartReducer: Reducer<CartState, ActionCart> = (
  state: CartState,
  action: ActionCart,
): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'INCREMENT_QUANTITY':
      return { ...state, cart: handleQuantity(state, action, 'add') };
    case 'DECREMENT_QUANTITY':
      return { ...state, cart: handleQuantity(state, action, 'subtract') };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((printer) => {
          return printer.id !== action.payload;
        }),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export const PrinterProvider: React.FC = ({ children }) => {
  const [printers, dispatchPrinters] = useReducer(
    printersReducer,
    initialPrinterState,
  );
  const [cart, dispatchCart] = useReducer(cartReducer, initialCartState);
  const [overlayActive, setOverlayActive] = useState<boolean>(false);

  function toggleOverlay() {
    setOverlayActive((prevOverlay) => !prevOverlay);
    console.log('iamhere');
  }

  return (
    <CartDispatchContext.Provider value={dispatchCart}>
      <CartStateContext.Provider value={cart}>
        <PrinterDispatchContext.Provider value={dispatchPrinters}>
          <PrinterStateContext.Provider value={printers}>
            <OverlayContext.Provider value={overlayActive}>
              <UpdateOverlayContext.Provider value={toggleOverlay}>
                {children}
              </UpdateOverlayContext.Provider>
            </OverlayContext.Provider>
          </PrinterStateContext.Provider>
        </PrinterDispatchContext.Provider>
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const usePrinters = () => useContext(PrinterStateContext);
export const useDispatchPrinters = () => useContext(PrinterDispatchContext);
export const useOverlay = () => useContext(OverlayContext);
export const useUpdateOverlay = () => useContext(UpdateOverlayContext);
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
