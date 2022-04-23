import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
};

export const Title = ({ children, className }: Props) => {
  return (
    <h1
      className={
        'mb-4 font-playfair text-4xl font-normal text-zinc-800 lg:text-5xl' +
        ' ' +
        className
      }
    >
      {children}
    </h1>
  );
};

export const SubTitle = ({ children, className }: Props) => {
  return (
    <h2
      className={
        'title-font mb-3 text-lg font-playfair text-zinc-800' + ' ' + className
      }
    >
      {children}
    </h2>
  );
};

export const Paragraph = ({ children, className }: Props) => {
  return (
    <h2
      className={
        'font-poppins text-base font-medium leading-relaxed text-zinc-800' +
        ' ' +
        className
      }
    >
      {children}
    </h2>
  );
};
