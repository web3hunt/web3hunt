import { PROJECTS } from '../../constants/placeholders';
import { PrimaryButton } from '../atoms/Buttons';
import { Paragraph, Title } from '../atoms/Typography';
import { Container } from '../templates/Container';
import { useSigner } from 'wagmi';
import {
  CMSAction,
  WEB3_HUNT_CONTRACT,
  WEB3_HUNT_WEBSITE_RINKEBY,
} from '../../constants/api.const';
import { ethers } from 'ethers';
import { WEB3HUNT_ABI } from '../../abis/Web3HuntContentManager';
import { Web3HuntContentManager } from '../../types/Web3HuntContentManager';
import { useQuery } from 'urql';
import { useEffect, useState } from 'react';
import {toast} from "react-toastify";

type Props = {
  id: string;
};

export const ProjectDetail = ({ id }: Props) => {
  const QUERY_PROJECT = `
{
    projects(where: {id: "${id}"}) {
        id
        owner {
          id
        }
        name
        short_description
        imagePreview
        metadata {
          id
          deployBlock
          deployTimestamp
        }
        supportersCount
        tags
        deployBlock
        deployTimestamp
        updateBlock
        updateTimestamp
      }
    }
`;
  const [result, reexecuteQuery] = useQuery({
    query: QUERY_PROJECT,
  });

  const [imgsrc, setImgsrc] = useState('');
  useEffect(() => {
    if (!result?.data?.projects[0].imagePreview.startsWith('Qm')) {
      getIpfsImage(
        `https://ipfs.io/ipfs/${result?.data?.projects[0].imagePreview}/picture`
      );
    } else {
      setImgsrc(
        `https://ipfs.io/ipfs/${result?.data?.projects[0].imagePreview}`
      );
    }
  }, [result]);

  const getIpfsImage = async (imageSource: string) => {
    console.log('feting image with:' + imageSource);
    const res = await fetch(imageSource);
    setImgsrc(await res.text());
  };

  console.log(result?.data?.projects[0]);

  const signer = useSigner();

  const project = result.data?.projects[0];

  const upvoteProject = async (id: string) => {
    const action = CMSAction.UPVOTE_PROJECT;
    const request = action + (id.toString().length === 1 ? '0' + id : id);
    const requests = [request];
    console.log('Creating project: ', requests);

    const cmsContract = new ethers.Contract(
      WEB3_HUNT_CONTRACT,
      WEB3HUNT_ABI,
      signer[0].data
    ) as Web3HuntContentManager;

    const response = await cmsContract.stateChange(requests);
    toast.info("Upvoted project, wait for chain to sync");
    console.log('Response: ', response.data);
    console.log('TxHash: ', response.hash);
  };

  return (
    <section id="project" className="mt-24">
      <Container>
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={imgsrc}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              Project Name
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {project?.name}
            </h1>

            <Paragraph>{project?.short_description}</Paragraph>

            <div className="flex mt-6 items-center pb-5 border-b-2 border-zinc-200 mb-5">
              <div className="flex items-center space-x-2">
                <span className="mr-3">Tags:</span>
                {project?.tags.map((tag) => (
                  <div
                    key={tag}
                    className="py-2 px-4 bg-secondary text-zinc-50 rounded-full"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <span className="title-font font-medium text-2xl text-gray-900">
                Owner:
              </span>
              <PrimaryButton
                onClick={() => {
                  upvoteProject(project?.id);
                }}
                className="ml-auto"
              >
                Upvote
              </PrimaryButton>
              <div className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                {project?.supportersCount}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
