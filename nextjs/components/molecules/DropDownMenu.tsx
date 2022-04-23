import React, { useState } from 'react';
import { SecondaryButton } from '../atoms/Buttons';

interface Props {
  label?: string;
  icon?: JSX.Element;
  transparentBackground?: boolean;
  items: DDMItem[];
  className?: string;
}

export interface DDMItem {
  icon?: JSX.Element;
  label: string;
  desc?: string;
  action?: () => any;
  link?: string;
}

export const DropDownMenu = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`relative inline-block text-left ${props.className}`}>
      <SecondaryButton
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-center px-9 ${
          props.transparentBackground ? 'bg-transparent' : ''
        }`}
      >
        {props.label}
        {props.icon || (
          <svg
            className="ml-1 hidden sm:block"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z" />
          </svg>
        )}
      </SecondaryButton>

      {isOpen && (
        <div className="absolute right-0 z-20 mt-2 w-full origin-top-right overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            className={'divide-y divide-gray-100 py-1'}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {props.items.map((item) => {
              return (
                <a
                  key={item.label}
                  onClick={item.action}
                  className={`font-poppins' flex cursor-pointer items-center justify-between px-8 py-8 text-left font-normal text-zinc-800 hover:bg-zinc-100 md:py-4`}
                  role="menuitem"
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
