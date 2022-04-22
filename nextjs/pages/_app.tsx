import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, chain, defaultChains, Chain } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";

function MyApp({ Component, pageProps }: AppProps) {
  const infuraId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
  // const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_APIKEY;
  const chains = defaultChains;

  const connectors = ({ chainId }: any) => {
    const rpcUrl =
      chains.find((x: Chain) => x.id === chainId)?.rpcUrls?.[0] ??
      chain.mainnet.rpcUrls[0];
    return [
      new InjectedConnector({
        chains,
        options: { shimDisconnect: true },
      }),
      new WalletConnectConnector({
        options: {
          infuraId,
          qrcode: true,
        },
      }),
      new WalletLinkConnector({
        options: {
          appName: "My wagmi app",
          jsonRpcUrl: `${rpcUrl}/${infuraId}`,
          // jsonRpcUrl: `${rpcUrl}/${alchemyId}`,
        },
      }),
    ];
  };

  return (
    <Provider>
      <Component {...pageProps} autoConnect connectors={connectors} />
    </Provider>
  );
}

export default MyApp;
