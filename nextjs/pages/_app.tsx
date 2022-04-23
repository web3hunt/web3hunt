import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'wagmi';
import { connectors } from '../connectors';
import { createClient, Provider as ProviderUrql } from 'urql';
import { urqlClient } from '../utils/urql';
import { CtxProvider } from '../context/CtxProvider';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CtxProvider>
      <ProviderUrql value={urqlClient}>
        <Provider autoConnect connectors={connectors}>
          <Component {...pageProps} />
          <ToastContainer />
        </Provider>
      </ProviderUrql>
    </CtxProvider>
  );
}

export default MyApp;
