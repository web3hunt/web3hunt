import React, { useContext, useRef, useState } from 'react';
import { AppCtx } from '../../context/CtxProvider';
import { PrimaryButton } from '../atoms/Buttons';
import { Container } from '../templates/Container';

export function CreateProject() {
  const [imagePreview, setImagePreview] = useState();
import {useAccount, useContract, useProvider, useSigner, useContractWrite} from "wagmi";
import { PrimaryButton } from '../atoms/Buttons';
import Popup from 'reactjs-popup';
import base58 from "bs58";
import {CMSAction, WEB3_HUNT_CONTRACT, WEB3_HUNT_WEBSITE_RINKEBY} from "../../constants/api.const";
import {WEB3HUNT_ABI} from "../../abis/Web3HuntContentManager";
import {Web3HuntContentManager} from "../../types/Web3HuntContentManager";
import {ethers} from "ethers";

export function CreateProject() {
  const [{ data: accountData }] = useAccount({
    fetchEns: false,
  });
  const signer = useSigner();

  const [{ data, error, loading }, write] = useContractWrite(
    {
      addressOrName: WEB3_HUNT_CONTRACT,
      contractInterface: WEB3HUNT_ABI,
    },
    'stateChange',
  )

  const [state, setState] = React.useState<{
    content?: string;
    cid?: string;
  }>({});
  const [imagePreview, setImagePreview] = useState()
  const [media, setMedia] = useState<File[]>([]);
  const ctx = useContext(AppCtx);

  const filePickerRef = useRef<HTMLInputElement>(null);
  const filePickerRefMedia = useRef<HTMLInputElement>(null);

  const createProjectOnchain = async (metadata: string, website: string) => {
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

    // make sure file is accesible by ipfs.io/ipfs/<hash>
    const dataIpfs = await fetch(`https://ipfs.io/ipfs/${metadata}`);
    console.log("dataIpfs", dataIpfs);

    const cmsContract = new ethers.Contract(
      WEB3_HUNT_CONTRACT, WEB3HUNT_ABI, signer[0].data
    ) as Web3HuntContentManager;

    const response = await cmsContract.stateChange(requests);
    console.log('Response: ', response.data);
    console.log('TxHash: ', response.hash);
  };

  const pickImageHandler = () => {
    filePickerRef.current?.click();
  };
  const pickImageHandlerMedia = () => {
    filePickerRefMedia.current?.click();
  };

  const pickedHandler = (event: React.FormEvent<HTMLInputElement>) => {
    if (
      (event.target as HTMLInputElement).files &&
      (event.target as HTMLInputElement).files?.length === 1
    ) {
      const pickedFiles = (event.target as HTMLInputElement).files;
      if (pickedFiles) {
        setImagePreview(pickedFiles[0]);
      }
    }
  };

  const pickedHandlerMedia = (event: React.FormEvent<HTMLInputElement>) => {
    if (
      (event.target as HTMLInputElement).files &&
      (event.target as HTMLInputElement).files?.length === 1
    ) {
      let pickedFiles = (event.target as HTMLInputElement)?.files;
      if (pickedFiles) {
        // media.push(pickedFile);
        let newMedia = Array.from(media);
        newMedia.push(pickedFiles[0]);
        setMedia(newMedia);
      }
    }
  };

  function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const createProject = async (event: any) => {
    event.preventDefault();

    const tags = event.target.tags.value.split(', ');

    var imagePreviewCID;
    if (imagePreview) {
      const previewRes = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: 'picture',
          payload: await getBase64(imagePreview),
        }),
      });
      imagePreviewCID = await previewRes.text();
    }

    let mediaCIDs = [];

    for (let m of media) {
      const previewRes = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectBody: {
            name: event.target.name.value,
            short_description: event.target.short_description.value,
            description: event.target.description.value,
            tags: tags,
            imagePreview: imagePreviewCID,
            media: mediaCIDs,
            metadata_type: "project_metadata"
          }
        })
      })

    if (!res.ok) throw new Error("Error creating project");
    const result = await res.json()
    alert(result.IpfsHash)
    const onchainResult = await createProjectOnchain(result.IpfsHash, WEB3_HUNT_WEBSITE_RINKEBY)
    console.log("onchainResult", onchainResult)
    console.log(result)
    // result.user => 'Ada Lovelace'
  };

  return (
    <div className="fixed z-20 w-full h-full bg-[#0202029e] backdrop-blur top-0">
      <Container className="justify-center items-center h-full">
        <form
          onSubmit={createProject}
          className="w-full bg-zinc-50 p-8 md:p-24 rounded-xl relative animate__animated animate__fadeInUpBig"
        >
          <button
            className="absolute top-10 right-0 z-50 inline-flex items-center justify-center rounded-md px-4 py-4 text-zinc-800 hover:text-gray-300 focus:outline-none dark:text-white md:right-10 md:px-4"
            onClick={() => ctx?.modalCtx.dispatch({ type: 'close' })}
          >
            <div className="flex w-8 flex-col items-end">
              <span className="block h-1 w-full translate-y-1 -rotate-45 rounded-full bg-zinc-800 transition-all"></span>
              <span className="block h-1 w-full rotate-45 rounded-full bg-zinc-800 transition-all"></span>
            </div>
          </button>
          <div className="group relative z-0 mb-6 w-full">
            <label
              htmlFor="name"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-zinc-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-purple-600 dark:text-zinc-400 peer-focus:dark:text-blue-500"
            >
              Name*
            </label>
            <input
              type="text"
              {...{
                required: {
                  value: true,
                  message: 'Please enter the project name',
                },
              }}
              id="name"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-zinc-900 focus:border-purple-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder="EthGlobal"
              required
            />
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <label
              htmlFor="short_descriptionn"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-zinc-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-purple-600 dark:text-zinc-400 peer-focus:dark:text-blue-500"
            >
              Short description*
            </label>
            <input
              type="text"
              {...{
                required: {
                  value: true,
                  message: 'Please enter a short project description',
                },
              }}
              id="short_description"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-zinc-900 focus:border-purple-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder="EthGlobal demo project"
              required
            />
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <label
              htmlFor="description"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-zinc-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-purple-600 dark:text-zinc-400 peer-focus:dark:text-blue-500"
            >
              Description*
            </label>
            <input
              type="text"
              {...{
                required: {
                  value: true,
                  message: 'Please enter a full project description',
                },
              }}
              id="description"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-zinc-900 focus:border-purple-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder="This is the best application ever, it codes itself and does everything you will ever need"
              required
            />
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <label
              htmlFor="tags"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-zinc-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-purple-600 dark:text-zinc-400 peer-focus:dark:text-blue-500"
            >
              Tags*
            </label>
            <input
              type="text"
              {...{
                required: {
                  value: true,
                  message: 'Please enter tags for your project',
                },
              }}
              id="tags"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-zinc-900 focus:border-purple-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder="ethglobal, ADASD"
              required
            />
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <input
              ref={filePickerRef}
              className="hidden"
              type="file"
              accept=".jpg, .png, .jpeg"
              onChange={pickedHandler}
            />
            <div
              className={`m-auto flex max-w-md items-center rounded-lg bg-gray-50 p-5 shadow-2xl dark:bg-slate-700`}
              onClick={pickImageHandler}
            >
              <div className="flex w-full flex-col items-center justify-center space-y-2">
                {!imagePreview ? (
                  <p>
                    <p className="w-full text-center">Upload preview image</p>
                  </p>
                ) : (
                  <p>{imagePreview.name}</p>
                )}
              </div>
            </div>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <input
              ref={filePickerRefMedia}
              className="hidden"
              type="file"
              accept=".jpg, .png, .jpeg"
              onChange={pickedHandlerMedia}
            />
            <div
              className={`m-auto flex max-w-md items-center rounded-lg bg-gray-50 p-5 shadow-2xl dark:bg-slate-700`}
              onClick={pickImageHandlerMedia}
            >
              <div className="flex w-full flex-col items-center justify-center space-y-2">
                <p>
                  <p className="w-full text-center">Add media pictures</p>
                  <ul>
                    {media.map((value, index) => {
                      return <li key={index}>{value.name}</li>;
                    })}
                  </ul>
                </p>
              </div>
            </div>
          </div>
          <div className="group relative z-0 mb-6 w-full flex justify-center">
            <PrimaryButton type="submit">Create Project</PrimaryButton>
          </div>
        </form>
      </Container>
    </div>
  );
}
