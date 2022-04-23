import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "wagmi";
import { connectors } from "../connectors";
import { createClient, Provider as ProviderUrql } from "urql";
import { urqlClient } from "../utils/urql";
import { ToastContainer, toast } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProviderUrql value={urqlClient}>
      <Provider autoConnect connectors={connectors}>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Provider>
    </ProviderUrql>
  );
}

export default MyApp;
