import { createContext, ReactNode, useReducer } from 'react';
import { defaultValue, IModalContext, modalCtxReducer } from './ModalReducer';

//add more interfaces and implement like the userReducer
interface IContext {
  modalCtx: IModalContext;
}

type Props = {
  children?: ReactNode;
};

export const AppCtx = createContext<IContext | null>(null);

export const CtxProvider = (props: Props) => {
  const [isOpen, dispatch] = useReducer(modalCtxReducer, defaultValue);
  return (
    <AppCtx.Provider value={{ modalCtx: { isOpen, dispatch } }}>
      {props.children}
    </AppCtx.Provider>
  );
};
