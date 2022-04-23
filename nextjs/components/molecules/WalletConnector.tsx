import { stat } from 'fs';
import React, { useEffect } from 'react';
import { SiweMessage } from 'siwe';
import { useAccount, useConnect, useNetwork, useSignMessage } from 'wagmi';
import { DDMItem, DropDownMenu } from './DropDownMenu';

export function WalletConnector() {
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: false,
  });
  const [{ data: connectData, error }, connect] = useConnect();
  const [{ data: networkData }] = useNetwork();

  const [, signMessage] = useSignMessage();

  const [state, setState] = React.useState<{
    address?: string;
    error?: Error;
    loading?: boolean;
  }>({});

  const signIn = React.useCallback(async () => {
    try {
      const address = accountData?.address;
      const chainId = networkData?.chain?.id;
      if (!address || !chainId) return;

      setState((x) => ({ ...x, error: undefined, loading: true }));
      // Fetch random nonce, create SIWE message, and sign with wallet
      const nonceRes = await fetch('/api/nonce');
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: await nonceRes.text(),
      });
      const signRes = await signMessage({ message: message.prepareMessage() });
      if (signRes.error) throw signRes.error;

      // Verify signature
      const verifyRes = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature: signRes.data }),
      });
      if (!verifyRes.ok) throw new Error('Error verifying message');

      setState((x) => ({ ...x, address, loading: false }));
    } catch (error) {
      setState((x) => ({ ...x, error, loading: false } as any));
    }
  }, []);

  // Fetch user when:
  React.useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch('/api/me');
        const json = await res.json();
        setState((x) => ({ ...x, address: json.address }));
      } finally {
        setState((x) => ({ ...x, loading: false }));
      }
    };
    // 1. page loads
    (async () => await handler())();

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener('focus', handler);
    return () => window.removeEventListener('focus', handler);
  }, []);

  let ddmItem: DDMItem[] = [];

  connectData.connectors.forEach((connector) => {
    ddmItem.push({ label: connector.name, action: () => connect(connector) });
  });

  if (accountData) {
    return (
      <DropDownMenu
        items={[
          {
            label: 'logout',
            action: async () => {
              await fetch('/api/logout');
              disconnect();
            },
          },
        ]}
        label={
          accountData.ens?.name
            ? `${accountData.ens?.name}`
            : accountData.address.substring(0, 5) +
              '...' +
              accountData.address.substring(accountData.address.length - 3)
        }
      ></DropDownMenu>
    );
  } else {
    return <DropDownMenu label="Connect Wallet" items={ddmItem}></DropDownMenu>;
  }
}
