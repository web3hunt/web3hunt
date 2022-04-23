import type { AppProps } from 'next/app';
import { useContext } from 'react';
import { AppCtx } from '../../context/CtxProvider';
import { PrimaryButton } from '../atoms/Buttons';
import { Paragraph, Title } from '../atoms/Typography';
import { Container } from '../templates/Container';
import { Upload } from '../Upload';

export const Hero = ({ pageProps }: AppProps) => {
  const ctx = useContext(AppCtx);
  return (
    <section className="body-font text-zinc-800">
      <Container className="py-24 lg:flex-row">
        <img
          className="absolute top-0 left-0 -z-10"
          src={'/assets/images/hero-blur-top.svg'}
          alt=""
        />
        <div className="mb-16 flex flex-col items-center text-center lg:mb-0 lg:w-1/2 lg:flex-grow lg:items-start lg:pr-24 lg:pr-16 lg:text-left">
          <Title className="lg:text-5xl xl:text-7xl">
            Upvote Your Favorite{' '}
            <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
              Projects
            </span>
          </Title>

          <Paragraph className="mb-8 font-semibold">
            {
              "We help create the best Web3 user experience. Ping us and let's build something epic together!"
            }
          </Paragraph>
          <div className="flex justify-center">
            <PrimaryButton
              onClick={() => {
                ctx?.modalCtx.dispatch({ type: 'open' });
              }}
            >
              Create Project
            </PrimaryButton>
          </div>
          <div className="flex justify-center"></div>
          <div className="flex justify-center">
            <Upload {...pageProps} />
          </div>
        </div>
        <div className="relative z-0 w-5/6 lg:w-full lg:w-1/2 lg:max-w-lg">
          <img
            className="absolute top-0 -left-10 -z-10 blur-[60px]"
            src={'assets/images/hero-blur-center.svg'}
            alt=""
          />
          <img
            className="object-cover object-center drop-shadow-2xl"
            alt="hero"
            src={'assets/images/hero-xl.png'}
          />
        </div>
      </Container>
    </section>
  );
};
