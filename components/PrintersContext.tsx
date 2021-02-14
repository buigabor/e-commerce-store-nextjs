import { createContext, useContext, useReducer } from 'react';

const PrinterStateContext = createContext([]);
const PrinterDispatchContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_PRINTERS':
      return [...state, action.payload];
    default:
      return state;
  }
};

export const PrinterProvider = ({ children }) => {
  const [printers, dispatch] = useReducer(reducer, []);
  return (
    <PrinterDispatchContext.Provider value={dispatch}>
      <PrinterStateContext.Provider value={printers}>
        {children}
      </PrinterStateContext.Provider>
    </PrinterDispatchContext.Provider>
  );
};

export const usePrinters = () => useContext(PrinterStateContext);
export const useDispatchPrinters = () => useContext(PrinterDispatchContext);
