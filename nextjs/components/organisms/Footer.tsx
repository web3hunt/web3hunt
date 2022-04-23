import Link from 'next/link';
import { SecondaryButton } from '../atoms/Buttons';
import { Title } from '../atoms/Typography';
import { Container } from '../templates/Container';

export const Footer = () => {
  return (
    <footer className="body-font relative mt-24 bg-[url('/assets/images/slope-bg-linear.svg')] bg-cover bg-top text-zinc-800">
      <img
        className="absolute top-0 -z-10 -translate-y-1/2 blur-[50px]"
        src="/assets/images/footer-blur.svg"
        alt=""
      />
      <Container className="relative pt-48 pb-8">
        <img
          className="absolute -top-8 h-[250px] -translate-y-10 drop-shadow-2xl "
          src="/assets/images/laptop.png"
          alt=""
        />
        <div className="flex flex-col items-center space-y-6 pb-24">
          <Title className="text-center text-gray-50">
            Show Off Your
            <br />
            Project!
          </Title>
          <SecondaryButton>{'Create Project'}</SecondaryButton>
        </div>

        <div className="flex w-full flex-col sm:flex-row">
          <Link href={'/'}>
            <a className="flex flex-row items-center justify-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
              <h1 className="title-font ml-4 hidden text-xl font-medium text-gray-50 md:block">
                Web3Hunt
              </h1>
            </a>
          </Link>

          <p className="mt-4 text-sm text-gray-200 sm:ml-4 sm:mt-0 sm:border-l-2 sm:border-gray-200 sm:pl-4 sm:pt-3">
            © 2022 Web3Hunt —
            <a
              href="https://twitter.com/nicoburkart"
              className="ml-1 text-white"
              rel="noopener noreferrer"
              target="_blank"
            >
              @web3hunt
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
};
