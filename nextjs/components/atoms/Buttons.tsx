import { MouseEventHandler, ReactNode } from 'react';

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  className?: string;
};

export const PrimaryButton = ({ className, children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 rounded-full border-0 bg-gradient-to-r from-[#B07DC9] to-secondary py-3 px-12 text-lg text-white shadow-2xl transition-all duration-200 focus:outline-none sm:mt-0 md:hover:from-[#aa66cc] md:hover:to-[#9696ff] ${className}`}
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({ className, children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 rounded-full border-0 bg-zinc-50 py-3 px-8 font-michroma text-base text-zinc-800 shadow-2xl transition-all focus:outline-none sm:mt-0 md:hover:bg-zinc-200 ${className}`}
    >
      {children}
    </button>
  );
};

export const FilterButton = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="rounded-full border-0 bg-gradient-to-r from-[#B07DC9] to-secondary py-2 px-6 text-lg text-white shadow-2xl transition-all duration-200 sm:mt-0 focus:outline-none focus:ring focus:ring-violet-300 md:hover:from-[#aa66cc] md:hover:to-[#9696ff]"
    >
      {children}
    </button>
  );
};