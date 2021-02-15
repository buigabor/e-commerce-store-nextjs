import type { AppProps } from 'next/app';
import { PrinterProvider } from '../components/PrintersContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PrinterProvider>
      <Component {...pageProps} />
    </PrinterProvider>
  );
}

export default MyApp;
