import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { NavigationItem } from '../atoms/NavigationItem';

type Props = {
  setNavOpen?: Dispatch<SetStateAction<boolean>>;
};

export const NavigationItems = ({ setNavOpen }: Props) => {
  const router = useRouter();

  return (
    <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3 md:ml-10 md:flex md:items-baseline md:space-x-4">
      <NavigationItem
        title="Home"
        active={router.pathname === ''}
        setNavOpen={setNavOpen}
      ></NavigationItem>
      <NavigationItem
        title="Projects"
        active={router.pathname === '#projects'}
        href="service"
        setNavOpen={setNavOpen}
      ></NavigationItem>
    </div>
  );
};
