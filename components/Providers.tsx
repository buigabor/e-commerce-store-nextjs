import CartProvider from './CartContext';
import MaterialProvider from './MaterialsContext';
import OverlayProvider from './OverlayContext';
import PrinterProvider from './PrintersContext';

export const Providers: React.FC = ({ children }) => {
  return (
    <MaterialProvider>
      <CartProvider>
        <PrinterProvider>
          <OverlayProvider>{children}</OverlayProvider>
        </PrinterProvider>
      </CartProvider>
    </MaterialProvider>
  );
};
