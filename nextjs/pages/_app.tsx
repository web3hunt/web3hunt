import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "wagmi";
import { connectors } from '../connectors';
import { createClient, Provider as ProviderUrql } from "urql";
import {urqlClient} from "../utils/urql";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ProviderUrql value={urqlClient}>
    <Provider autoConnect connectors={connectors}>
      <Component {...pageProps} />
    </Provider>
    </ProviderUrql>
  );
}

export default MyApp;
