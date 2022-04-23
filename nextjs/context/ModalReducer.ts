import { Dispatch } from 'react';

export const defaultValue = false;

export interface IModalContext {
  isOpen: boolean;
  dispatch: Dispatch<ACTIONTYPE>;
}

type ACTIONTYPE = { type: 'open' } | { type: 'close' };

export const modalCtxReducer = (state: boolean, action: ACTIONTYPE) => {
  switch (action.type) {
    case 'open':
      return true;
    case 'close':
      return false;
    default:
      throw new Error();
  }
};
