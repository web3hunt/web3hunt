import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Paragraph, SubTitle } from '../atoms/Typography';

type Props = {
  id: string;
  title: string;
  desc: string;
  image: string;
  votes: number;
  tags: string[];
};

export const ProjectCard = ({ id, title, desc, image, votes, tags }: Props) => {
  // console.log(image.startsWith('Qm') ? `https://ipfs.io/ipfs/${image}` : `https://ipfs.io/ipfs/${image}/picture`)
  const imageSource = image.startsWith('Qm')
    ? `https://ipfs.io/ipfs/${image}`
    : `https://ipfs.io/ipfs/${image}/picture`;
  const [imgsrc, setImgsrc] = useState('');

  useEffect(() => {
    if (!image.startsWith('Qm')) {
      getIpfsImage();
    } else {
      setImgsrc(`https://ipfs.io/ipfs/${image}`);
    }
  }, []);

  const getIpfsImage = async () => {
    const res = await fetch(imageSource);
    setImgsrc(await res.text());
  };

  console.log(imgsrc);
  return (
    <div
      data-aos="zoom-in"
      className="relative flex flex-col items-center overflow-hidden rounded-xl bg-gradient-to-br from-[rgba(79,23,123,0.8)] to-[rgba(24,82,84,0.9)] text-center backdrop-blur-[10px] cursor-pointer"
    >
      <div className="flex relative w-full min-h-[200px] items-center space-x-4 lg:flex-col lg:items-start lg:space-x-0">
        <img className="w-full h-full object-cover" src={imgsrc} alt={title} />

        <div className="absolute flex items-center justify-center h-12 w-12 top-2 right-2 rounded-full bg-[#1528684d] backdrop-blur">
          {votes}
        </div>
        <div className="absolute bottom-2 left-2 flex space-x-2 text-zinc-50">
          {tags.map((tag, index) => (
            <div
              key={index}
              className={`py-2 px-4 bg-secondary rounded-full ${
                index < 2 ? '' : 'hidden'
              }`}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 w-full">
        <SubTitle className="mb-2 text-left text-2xl text-gray-50">
          {title}
        </SubTitle>
        <Paragraph className="text-left font-normal text-gray-50">
          {desc}
        </Paragraph>
      </div>
    </div>
  );
};
