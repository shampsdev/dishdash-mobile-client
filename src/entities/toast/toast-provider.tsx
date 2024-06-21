import React, { useState, useCallback } from 'react';
import { Toast, ToastProps } from './ui';

interface ContextProps {
  toasts: ToastProps[];
  addToast: (toast: ToastProps) => void;
}

export const Context = React.createContext<ContextProps>({
  toasts: [],
  addToast: () => {},
});

interface ToastProviderProps {
  children: JSX.Element;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback((toast: ToastProps) => {
    setToasts((prevToasts) => [...prevToasts, { ...toast }]);
  }, []);

  return (
    <Context.Provider value={{ toasts, addToast }}>
      {toasts.flatMap((toast, idx) => {
        return <Toast index={idx} key={idx} {...toast} />;
      })}
      {children}
    </Context.Provider>
  );
};
