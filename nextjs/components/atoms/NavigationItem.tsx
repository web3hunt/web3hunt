import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  title: string;
  href?: string;
  active: boolean;
  setNavOpen?: Dispatch<SetStateAction<boolean>>;
};

export const NavigationItem = ({ title, active, href, setNavOpen }: Props) => {
  return (
    <Link href={`${href ? '#' + href : '/'}`}>
      <a
        onClick={() => {
          if (setNavOpen) {
            setNavOpen(false);
          }
        }}
        className={
          (active ? 'text-zinc-800' : 'text-zinc-800') +
          ' md:text-md block rounded-md px-3 py-2 text-base font-medium hover:text-zinc-800 md:inline'
        }
      >
        {title}
      </a>
    </Link>
  );
};
