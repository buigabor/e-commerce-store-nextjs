import { createWrapper } from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import store from '../store/store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

// create a makeStore function
const makeStore = () => store;

// export an assembled wrapper
const wrapper = createWrapper(makeStore, { debug: true });

export default wrapper.withRedux(MyApp);
