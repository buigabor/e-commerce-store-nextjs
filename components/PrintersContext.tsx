import {
  createContext,
  Dispatch,
  Reducer,
  useContext,
  useReducer,
} from 'react';

interface ActionPrinters {
  type: string;
  payload: any;
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

export interface PrinterState {
  printers: Printer[];
  filteredPrinters: Printer[];
  loading: boolean;
  error: null | string;
}

interface ActionPrinterFilter {
  type: string;
  payload: {
    matFilterTags: string[];
    techFilterTags: string[];
    priceFilterTags: number[];
  };
}

const initialPrinterState = {
  printers: [],
  filteredPrinters: [],
  loading: false,
  error: null,
};

const PrinterStateContext = createContext<PrinterState>(initialPrinterState);
const PrinterDispatchContext = createContext<Dispatch<ActionPrinters>>(
  () => null,
);

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
    })
    .filter((printer) => {
      return (
        printer.price >= action.payload.priceFilterTags[0] &&
        printer.price <= action.payload.priceFilterTags[1]
      );
    });
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

const PrinterProvider: React.FC = ({ children }) => {
  const [printers, dispatchPrinters] = useReducer(
    printersReducer,
    initialPrinterState,
  );

  return (
    <PrinterDispatchContext.Provider value={dispatchPrinters}>
      <PrinterStateContext.Provider value={printers}>
        {children}
      </PrinterStateContext.Provider>
    </PrinterDispatchContext.Provider>
  );
};

export default PrinterProvider;
export const usePrinters = () => useContext(PrinterStateContext);
export const useDispatchPrinters = () => useContext(PrinterDispatchContext);
