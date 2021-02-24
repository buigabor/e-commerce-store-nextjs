import {
  createContext,
  Dispatch,
  useContext,
  useReducer,
  useState,
} from 'react';

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

export interface Material {
  id: string;
  name: string;
  type: string;
  price: number;
}

export interface PrinterState {
  printers: Printer[];
  filteredPrinters: Printer[];
  loading: boolean;
  error: null | string;
}

export interface MaterialState {
  materials: Material[];
  filteredMaterials: Material[];
  loading: boolean;
  error: null | string;
}

export interface CartState {
  cart: (CartItem | CartMaterialItem)[];
}

const initialPrinterState = {
  printers: [],
  filteredPrinters: [],
  loading: false,
  error: null,
};

const initialMaterialState = {
  materials: [],
  filteredMaterials: [],
  loading: false,
  error: null,
};

const initialCartState = {
  cart: [],
};

const MaterialStateContext = createContext<MaterialState>(initialMaterialState);
const MaterialDispatchContext = createContext<Dispatch<ActionPrinters>>(
  () => null,
);
const PrinterStateContext = createContext<PrinterState>(initialPrinterState);
const PrinterDispatchContext = createContext<Dispatch<ActionPrinters>>(
  () => null,
);
const OverlayContext = createContext<boolean>(false);
const UpdateOverlayContext = createContext(() => {});
const CartStateContext = createContext<CartState>(
  // localStorage.cart ? localStorage.cart : initialCartState,
  initialCartState,
);
const CartDispatchContext = createContext<Dispatch<ActionCart>>(() => null);

export interface CartItem extends Printer {
  quantity: number;
}

export interface CartMaterialItem extends Material {
  quantity: number;
}

interface ActionPrinters {
  type: string;
  payload: any;
}

interface ActionMaterials {
  type: string;
  payload: any;
}

interface ActionPrinterFilter {
  type: string;
  payload: {
    matFilterTags: string[];
    techFilterTags: string[];
    priceFilterTags: number[];
  };
}

interface ActionMaterialFilter {
  type: string;
  payload: {
    typeFilterTags: string[];
    priceFilterTags: number[];
  };
}

interface ActionCart {
  type: string;
  payload: any;
}

type Reducer<S, A> = (prevState: S, action: A) => S;

const handleFilterPrinters = (
  state: PrinterState,
  action: ActionPrinterFilter,
) => {
  return state.printers
    .filter((printer) => {
      // SHOW IF ANY OF THE FILTER IS TRUE
      if (action.payload.matFilterTags.length === 0) {
        return true;
      }
      for (
        let index = 0;
        index < action.payload.matFilterTags.length;
        index++
      ) {
        if (
          printer.compatibleMaterial?.includes(
            action.payload.matFilterTags[index],
          )
        ) {
          return true;
        }
      }
      return false;
      // SHOW IF EVERY FILTER IS TRUE FOR THAT PRINTER
      // return action.payload.matFilterTags.some((mat: string) => {
      //   return printer.compatibleMaterial.includes(mat);
      // });
    })
    .filter((printer) => {
      if (action.payload.techFilterTags.length === 0) {
        return true;
      }
      for (
        let index = 0;
        index < action.payload.techFilterTags.length;
        index++
      ) {
        if (printer.technology.includes(action.payload.techFilterTags[index])) {
          return true;
        }
      }
      return false;
      // return action.payload.techFilterTags.some((mat: string) => {
      //   return printer.technology.includes(mat);
      // });
    })
    .filter((printer) => {
      return (
        printer.price >= action.payload.priceFilterTags[0] &&
        printer.price <= action.payload.priceFilterTags[1]
      );
    });
};

const handleFilterMaterials = (
  state: MaterialState,
  action: ActionMaterialFilter,
) => {
  return state.materials
    .filter((material) => {
      // SHOW IF SOME FILTER IS TRUE
      if (action.payload.typeFilterTags.length === 0) {
        return true;
      }
      for (
        let index = 0;
        index < action.payload.typeFilterTags.length;
        index++
      ) {
        if (material.type.includes(action.payload.typeFilterTags[index])) {
          return true;
        }
      }
      // SHOW IF EVERY FILTER IS TRUE
      // return action.payload.typeFilterTags.every((type: string) => {
      //   return material.type.includes(type);
      // });
    })
    .filter((material) => {
      return (
        material.price >= action.payload.priceFilterTags[0] &&
        material.price <= action.payload.priceFilterTags[1]
      );
    });
};

const materialsReducer: Reducer<MaterialState, ActionMaterials> = (
  state: MaterialState,
  action: ActionMaterials,
) => {
  switch (action.type) {
    case 'SET_MATERIALS':
      console.log('set');

      return { ...state, materials: [...action.payload] };
    case 'FILTER':
      return {
        ...state,
        filteredMaterials: handleFilterMaterials(state, action),
      };
    case 'SEARCH':
      return {
        ...state,
        filteredMaterials: state.materials.filter((material) => {
          if (
            material.name.toLowerCase().includes(action.payload.toLowerCase())
          ) {
            return true;
          }
          return false;
        }),
      };
    default:
      return state;
  }
};

const printersReducer: Reducer<
  PrinterState,
  ActionPrinters | ActionPrinterFilter
> = (state: PrinterState, action: ActionPrinters | ActionPrinterFilter) => {
  switch (action.type) {
    case 'SET_PRINTERS':
      return { ...state, printers: [...action.payload], loading: false };
    case 'FILTER':
      return {
        ...state,
        filteredPrinters: handleFilterPrinters(state, action),
      };
    case 'SEARCH':
      return {
        ...state,
        filteredPrinters: state.printers.filter((printer) => {
          if (
            printer.name.toLowerCase().includes(action.payload.toLowerCase())
          ) {
            return true;
          }
          return false;
        }),
      };
    default:
      return state;
  }
};

const handleQuantity = (
  state: CartState,
  action: ActionCart,
  mode: string,
): (CartItem | CartMaterialItem)[] => {
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

const cartReducer: Reducer<CartState, ActionCart> = (
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
      let cartQtyIncremented = handleQuantity(state, action, 'add');
      cart = { ...state, cart: cartQtyIncremented };
      localStorage.setItem('cart', JSON.stringify(cart));
      return { ...state, cart: cartQtyIncremented };
    case 'DECREMENT_QUANTITY':
      let cartQtyDecremented = handleQuantity(state, action, 'subtract');
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

export const PrinterProvider: React.FC = ({ children }) => {
  const [printers, dispatchPrinters] = useReducer(
    printersReducer,
    initialPrinterState,
  );
  const [materials, dispatchMaterials] = useReducer(
    materialsReducer,
    initialMaterialState,
  );
  const [cart, dispatchCart] = useReducer(
    cartReducer,
    // localStorage.cart ? localStorage.cart : initialCartState,
    initialCartState,
  );
  const [overlayActive, setOverlayActive] = useState<boolean>(false);

  // useEffect(() => {
  //   let cart = localStorage.getItem('cart');
  //   if (cart) {
  //     return JSON.parse(cart);
  //   }

  //   return initialCartState;
  // }, []);

  function toggleOverlay() {
    setOverlayActive((prevOverlay) => !prevOverlay);
  }

  return (
    <MaterialStateContext.Provider value={materials}>
      <MaterialDispatchContext.Provider value={dispatchMaterials}>
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
      </MaterialDispatchContext.Provider>
    </MaterialStateContext.Provider>
  );
};

export const usePrinters = () => useContext(PrinterStateContext);
export const useDispatchPrinters = () => useContext(PrinterDispatchContext);
export const useMaterials = () => useContext(MaterialStateContext);
export const useDispatchMaterials = () => useContext(MaterialDispatchContext);
export const useOverlay = () => useContext(OverlayContext);
export const useUpdateOverlay = () => useContext(UpdateOverlayContext);
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
