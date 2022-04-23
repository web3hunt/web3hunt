import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'wagmi';
import { connectors } from '../connectors';
import { createClient, Provider as ProviderUrql } from 'urql';
import { urqlClient } from '../utils/urql';
import { CtxProvider } from '../context/CtxProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CtxProvider>
      <ProviderUrql value={urqlClient}>
        <Provider autoConnect connectors={connectors}>
          <Component {...pageProps} />
        </Provider>
      </ProviderUrql>
    </CtxProvider>
  );
}

export default MyApp;
