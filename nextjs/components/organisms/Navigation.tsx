import Link from 'next/link';
import { useState } from 'react';
import { NavigationItems } from '../molecules/NavigationItems';
import { Container } from '../templates/Container';

export const Navigation = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header>
      <nav className="py-4">
        <Container>
          <div className="flex h-16 w-full items-center justify-between">
            <div className="flex items-center px-4 md:pl-0 ">
              <Link href={'/'}>
                <a className="flex flex-row items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
                  <h1 className="title-font ml-4 hidden text-xl font-medium md:block">
                    Web3Hunt
                  </h1>
                </a>
              </Link>
              <div className="hidden md:block">
                <NavigationItems></NavigationItems>
              </div>
            </div>
            <div className="flex md:hidden">
              <button
                className="relative z-50 inline-flex items-center justify-center rounded-md px-2 py-2 text-zinc-800 hover:text-gray-300 focus:outline-none dark:text-white md:px-4"
                onClick={() => setNavOpen(!navOpen)}
              >
                <div className="flex w-8 flex-col items-end">
                  <span
                    className={`block h-1 w-full rounded-full bg-zinc-800 transition-all ${
                      navOpen ? 'translate-y-1 -rotate-45' : 'mb-2'
                    }`}
                  ></span>
                  <span
                    className={`block h-1 rounded-full bg-zinc-800 transition-all ${
                      navOpen ? 'w-full rotate-45' : 'w-2/3'
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>

          <div
            className={`left- fixed top-0 z-40 flex h-full w-full flex-col items-center justify-center text-center transition-all ${
              navOpen
                ? 'bg-gradient-to-br from-gray-50 to-purple-50'
                : 'hidden' + ' md:hidden'
            }`}
          >
            <NavigationItems setNavOpen={setNavOpen}></NavigationItems>
          </div>
        </Container>
      </nav>
    </header>
  );
};
