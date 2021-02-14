import { PrinterProvider } from '../components/PrintersContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <PrinterProvider>
      <Component {...pageProps} />
    </PrinterProvider>
  );
}

export default MyApp;
