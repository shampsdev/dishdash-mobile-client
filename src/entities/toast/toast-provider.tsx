import React, { useState, useCallback } from 'react';
import { InternalToastProps, Toast, ToastProps } from './ui';

interface ContextProps {
  toasts: (ToastProps & InternalToastProps)[];
  addToast: (toast: ToastProps, promise: Promise<void>) => void;
}

export const Context = React.createContext<ContextProps>({
  toasts: [],
  addToast: () => {},
});

interface ToastProviderProps {
  children: JSX.Element;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<(ToastProps & InternalToastProps)[]>([]);

  const addToast = useCallback((toast: ToastProps, promise: Promise<void>) => {
    setToasts((prevToasts) => [...prevToasts, { ...toast, promise }]);
  }, []);

  return (
    <Context.Provider value={{ toasts, addToast }}>
      {toasts.flatMap((toast, idx) => {
        return <Toast key={idx} {...toast} />;
      })}
      {children}
    </Context.Provider>
  );
};
