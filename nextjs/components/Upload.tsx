import type { AppProps } from 'next/app';
import React from "react";
import { useAccount } from "wagmi";

export function Upload({ pageProps }: AppProps) {
  const [{ data: accountData }] = useAccount({
    fetchEns: false,
  });

  const [state, setState] = React.useState<{
    content?: string;
    cid?: string;
  }>({});
  
  const upload = React.useCallback(async (content: any) => {
    if (content != undefined) {
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName: 'payload.json', payload: `${content}` }),
      });
      if (!uploadRes.ok) throw new Error("Error uploading");
      const cid = await uploadRes.text()
      setState((x) => ({ ...x, cid: `${cid}` }));
    }
  }, []);

  return (
    <div>
      <input type="text" id="input" onChange={(e) => setState((x) => ({ ...x, content: `${e.target.value}` }))}/>
      <button onClick={() => upload(state.content)}>
        Upload
      </button>
      <br />
      { state.cid }
    </div>
  )
}