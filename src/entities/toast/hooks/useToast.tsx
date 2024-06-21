import { useContext } from 'react';
import { Context } from '../toast-provider';
import { ToastProps } from '../ui';

export const useToast = () => {
  const { addToast } = useContext(Context);

  const promise = (promise: Promise<void>, toast: ToastProps) => {
    addToast(toast);
  };

  const message = (duration: number, toast: ToastProps) => {
    const promise = new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });

    addToast(toast);
  };

  return {
    promise,
    message,
  };
};
