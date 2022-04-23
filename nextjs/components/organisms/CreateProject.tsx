import React, { useRef, useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { PrimaryButton } from '../atoms/Buttons';
import Popup from 'reactjs-popup';

export function CreateProject() {
  const [{ data: accountData }] = useAccount({
    fetchEns: false,
  });

  const [state, setState] = React.useState<{
    content?: string;
    cid?: string;
  }>({});
  const [imagePreview, setImagePreview] = useState()
  const [media, setMedia] = useState<File[]>([]);

  const filePickerRef = useRef<HTMLInputElement>(null);
  const filePickerRefMedia = useRef<HTMLInputElement>(null);

  const pickImageHandler = () => {
    filePickerRef.current?.click()
  }
  const pickImageHandlerMedia = () => {
    filePickerRefMedia.current?.click()
  }

  const pickedHandler = (event: React.FormEvent<HTMLInputElement>) => {
    let pickedFile
    if (
      (event.target as HTMLInputElement).files &&
      (event.target as HTMLInputElement).files.length === 1
    ) {
      pickedFile = (event.target as HTMLInputElement).files[0]
      setImagePreview(pickedFile)
    }
  }

  const pickedHandlerMedia = (event: React.FormEvent<HTMLInputElement>) => {
    let pickedFile
    if (
      (event.target as HTMLInputElement).files &&
      (event.target as HTMLInputElement).files.length === 1
    ) {
      pickedFile = (event.target as HTMLInputElement).files[0]
      // media.push(pickedFile);
      var newMedia = Array.from(media);
      newMedia.push(pickedFile)
      setMedia(newMedia)
    }
  }

  function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const createProject = async event => {
    event.preventDefault()

    const tags = event.target.tags.value.split(", ");

    var imagePreviewCID
    if (imagePreview) {
      const previewRes = await fetch(
        '/api/upload',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            fileName: 'picture', 
            payload: await getBase64(imagePreview)
          })
        }
      )
      imagePreviewCID = await previewRes.text()
    }

    let mediaCIDs = []

    for (let m of media) {
      const previewRes = await fetch(
        '/api/upload',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            fileName: 'picture', 
            payload: await getBase64(m)
          })
        }
      )
      mediaCIDs.push(await previewRes.text())
    }

    const res = await fetch(
      '/api/ipfs-json',
      {
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
    const result = await res.text()
    console.log(result)
    // result.user => 'Ada Lovelace'
  }

  return (
      <div>
        <form onSubmit={createProject}>
          <div className="group relative z-0 mb-6 w-full">
            <label
                htmlFor="name"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-zinc-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-purple-600 dark:text-zinc-400 peer-focus:dark:text-blue-500"
              >
                Name*
            </label>
            <input
              type="text"
              {...({
                required: { value: true, message: 'Please enter the project name' }
              })}
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
              {...({
                required: { value: true, message: 'Please enter a short project description' }
              })}
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
              {...({
                required: { value: true, message: 'Please enter a full project description' }
              })}
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
              {...({
                required: { value: true, message: 'Please enter tags for your project' }
              })}
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
                      return <li key={index}>{value.name}</li>
                  })}</ul>
                </p>
              </div>
            </div>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <PrimaryButton type="submit">Create Project</PrimaryButton>
          </div>
        </form>
      </div>
  )
}