import {
  createContext,
  Dispatch,
  useContext,
  useReducer,
  useState,
} from 'react';

const PrinterStateContext = createContext<Printer[]>([]);
const PrinterDispatchContext = createContext<Dispatch<ActionPrinters>>(
  () => null,
);
const OverlayContext = createContext<boolean>(false);
const UpdateOverlayContext = createContext(() => {});
const CartStateContext = createContext<CartItem[]>([]);
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

const printersReducer: Reducer<Printer[], ActionPrinters> = (
  state: Printer[],
  action: ActionPrinters,
) => {
  switch (action.type) {
    case 'GET_PRINTERS':
      return [...state, ...action.payload];
    default:
      return state;
  }
};

const cartReducer: Reducer<CartItem[], ActionCart> = (
  state: CartItem[],
  action: ActionCart,
) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_ONE_FROM_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return [...state, action.payload];
    case 'CLEAR_CART':
      return [...state, action.payload];
    default:
      return state;
  }
};

export const PrinterProvider: React.FC = ({ children }) => {
  const [printers, dispatchPrinters] = useReducer(printersReducer, []);
  const [cart, dispatchCart] = useReducer(cartReducer, []);
  const [overlayActive, setOverlayActive] = useState<boolean>(false);

  function toggleOverlay() {
    setOverlayActive((prevOverlay) => !prevOverlay);
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
