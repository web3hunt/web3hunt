import type { AppProps } from 'next/app';
import React from "react";
import { PrimaryButton } from '../components/atoms/Buttons';
import { SiweMessage } from "siwe";
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi";

export function Login({ pageProps }: AppProps) {
  const [{ data: accountData }] = useAccount({
    fetchEns: false,
  });
  return (
    accountData ? <SignInWithEthereum {...pageProps} /> : <ConnectWallet {...pageProps} />
  )
}

function ConnectWallet({ pageProps }: AppProps) {
  const [{ data, error }, connect] = useConnect()

  return (
    <PrimaryButton>
      <a>Connect</a>
      <ul>
        {data.connectors.map((connector) => (
          <li key={connector.id}>
            <a onClick={() => connect(connector)}>{connector.name} {!connector.ready && ' (unsupported)'}</a>
          </li>
        ))}

        {/* {error && (
          <div>{error?.message ?? "Failed to connect"}</div>
        )} */}
      </ul>
    </PrimaryButton>
  )
};

export function SignInWithEthereum({ pageProps }: AppProps) {
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: false,
  });
  const [{ data: networkData }] = useNetwork();

  const [state, setState] = React.useState<{
    address?: string;
    error?: Error;
    loading?: boolean;
  }>({});
  const [, signMessage] = useSignMessage();

  const signIn = React.useCallback(async () => {
    try {
      const address = accountData?.address;
      const chainId = networkData?.chain?.id;
      if (!address || !chainId) return;

      setState((x) => ({ ...x, error: undefined, loading: true }));
      // Fetch random nonce, create SIWE message, and sign with wallet
      const nonceRes = await fetch("/api/nonce");
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce: await nonceRes.text(),
      });
      const signRes = await signMessage({ message: message.prepareMessage() });
      if (signRes.error) throw signRes.error;

      // Verify signature
      const verifyRes = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature: signRes.data }),
      });
      if (!verifyRes.ok) throw new Error("Error verifying message");

      setState((x) => ({ ...x, address, loading: false }));
    } catch (error) {
      setState((x) => ({ ...x, error, loading: false } as any));
    }
  }, []);

  // Fetch user when:
  React.useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch("/api/me");
        const json = await res.json();
        setState((x) => ({ ...x, address: json.address }));
      } finally {
        setState((x) => ({ ...x, loading: false }));
      }
    };
    // 1. page loads
    (async () => await handler())();

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener("focus", handler);
    return () => window.removeEventListener("focus", handler);
  }, []);

  return (
    <div>
      {state.address ? (
        <div>
          <div>Signed in as {state.address.substring(0, 6)}...</div>
          <PrimaryButton
            onClick={async () => {
              await fetch("/api/logout");
              setState({});
            }}
          >
            Sign Out
          </PrimaryButton>
        </div>
      ) : (
        <PrimaryButton onClick={signIn}>
          Sign-In with Ethereum with{" "}
          {accountData?.ens?.name
            ? `${accountData.ens?.name}`
            : accountData?.address?.substring(0, 6)}
          ...
        </PrimaryButton>
      )}
      <PrimaryButton onClick={disconnect}>
        Disconnect Wallet
      </PrimaryButton>
    </div>
  );
};