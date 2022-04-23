import type { AppProps } from 'next/app';
import { PrimaryButton } from '../atoms/Buttons';
import { Paragraph, Title } from '../atoms/Typography';
import { Container } from '../templates/Container';
import { Wagmi } from '../Wagmi';

export const Hero = ({ pageProps }: AppProps) => {
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
            Show Your{' '}
            <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
              Projects
            </span>
          </Title>
          <h2 className="mb-4 font-poppins text-base font-bold text-zinc-800 xl:text-xl">
            Let the community upvote your projects and get visability
          </h2>

          <Paragraph className="mb-8 font-semibold">
            {
              "We specialise in non fungible token and user experience for websites. Ping us and let's build something epic together!"
            }
          </Paragraph>
          <div className="flex justify-center">
            <PrimaryButton>Create Project</PrimaryButton>
          </div>
          <div className="flex justify-center">
            <Wagmi {...pageProps} />
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
