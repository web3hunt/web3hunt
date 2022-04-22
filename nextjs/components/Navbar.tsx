import React from "react";
import { SiweMessage } from "siwe";
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi";

const ConnectWallet = () => {
  const [{ data: connectData, error: connectError }, connect] = useConnect();

  return (
    <li>
      <a>Connect</a>
      <ul>
        {connectData.connectors.map((connector) => (
          <li key={`sub-${connector.id}`}>
            <a onClick={() => connect(connector)}>{connector.name}</a>
          </li>
        ))}

        {connectError && (
          <div>{connectError?.message ?? "Failed to connect"}</div>
        )}
      </ul>
    </li>
  );
};

const SignInWithEthereum = () => {
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
    <li>
      {state.address ? (
        <div>
          <div>Signed in as {state.address.substring(0, 6)}...</div>
          <button
            onClick={async () => {
              await fetch("/api/logout");
              setState({});
            }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button disabled={state.loading} onClick={signIn}>
          Sign-In with Ethereum with{" "}
          {accountData?.ens?.name
            ? `${accountData.ens?.name}`
            : accountData?.address?.substring(0, 6)}
          ...
        </button>
      )}
    </li>
  );
};

const Navbar = () => {
  const [{ data: accountData }] = useAccount({
    fetchEns: false,
  });

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">web3nao</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <a>Item 1</a>
          </li>
          <li tabIndex={0}>
            <a>
              Parent
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 bg-base-100">
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </li>
          {accountData ? <SignInWithEthereum /> : <ConnectWallet />}
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
