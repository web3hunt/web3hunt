import type { AppProps } from 'next/app';
import { Hero } from '../components/organisms/Hero';
import { ProjectOverview } from '../components/organisms/ProjectOverview';
import Layout from '../components/templates/Layout';
import { useAccount, useContract, useProvider } from 'wagmi';
import { WEB3HUNT_ABI } from '../abis/Web3HuntContentManager';
import { Web3HuntContentManager } from '../types/Web3HuntContentManager';
import { CMSAction, WEB3_HUNT_CONTRACT } from '../constants/api.const';
import base58 from 'bs58';
import { useQuery } from 'urql';
import { useEffect } from 'react';
import { QUERY } from '../queries';

function Home({ pageProps }: AppProps) {
  const provider = useProvider();
  const contract = useContract({
    addressOrName: WEB3_HUNT_CONTRACT,
    contractInterface: WEB3HUNT_ABI,
    signerOrProvider: provider,
  }) as Web3HuntContentManager;

  // retireve data from projects
  const [result, reexecuteQuery] = useQuery({
    query: QUERY,
  });

  // example of how to create new project

  const createProject = async (metadata: string, website: string) => {
    if (metadata === undefined || metadata === '') {
      throw new Error('Metadata is required');
    }
    if (website === undefined || website === '') {
      throw new Error('Website id is required');
    }

    // parse ipfs metadata to bytes
    console.log(metadata);
    const ipfsHashesBinary = metadata
      .split('_')
      .map((ipfsHashB58: string) => base58.decode(ipfsHashB58));
    console.log(ipfsHashesBinary);
    // @ts-ignore
    // TODO check
    const ipfsHashesDecoded = ipfsHashesBinary.map((ipfsHashBinary: string) =>
      new Buffer(ipfsHashBinary).toString('hex')
    );
    console.log(ipfsHashesDecoded);
    const ipfsHashes = ipfsHashesDecoded.map(
      (ipfsHashDecoded: string | any[]) =>
        ipfsHashDecoded.slice(4, ipfsHashDecoded.length)
    );
    console.log(ipfsHashes);

    const action = CMSAction.CREATE_PROJECT;
    const request = action + website + ipfsHashes;
    const requests = [request];
    console.log('Creating project: ', requests);
    const response = await contract.stateChange(requests);
    console.log('Response: ', response);
    console.log('TxHash: ', response.hash);
  };

  const upvoteProject = async (projectId: string) => {
    const action = CMSAction.UPVOTE_PROJECT;
    const request = action + projectId;
    const requests = [request];
    console.log('Upvoting project: ', requests);
    const response = await contract.stateChange(requests);
    console.log('Response: ', response);
    console.log('TxHash: ', response.hash);
  };

  const updateProject = async (projectId: string, metadata: string) => {
    if (metadata === undefined || metadata === '') {
      throw new Error('Metadata is required');
    }
    const action = CMSAction.UPDATE_PROJECT;
    const request = action + projectId + metadata;
    const requests = [request];
    console.log('Updating project: ', requests);
    const response = await contract.stateChange(requests);
    console.log('Response: ', response);
    console.log('TxHash: ', response.hash);
  };

  useEffect(() => {
    console.log('Urql result: ', result);
  }, [result]);

  return (
    <Layout title="Home">
      <Hero {...pageProps}></Hero>
      <ProjectOverview></ProjectOverview>
    </Layout>
  );
}

export default Home;
