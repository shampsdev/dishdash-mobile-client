import { useContext, useEffect, useState } from 'react';
import { Context } from '../toast-provider';
import { ToastProps } from '../ui';

export const useToast = () => {
  const { addToast, activeToast } = useContext(Context);
  const [list, setList] = useState<
    (ToastProps & { duration: number; resolve: () => void })[]
  >([]);

  useEffect(() => {
    const toast = list.find((x) => x.message == activeToast?.message);
    if (toast) {
      setTimeout(toast.resolve, toast.duration);
      setList((list) => {
        return list.filter((x) => x.message != toast.message);
      });
    }
  }, [activeToast]);

  const promise = (promise: Promise<void>, toast: ToastProps) => {
    addToast(toast, promise);

    return promise;
  };

  const message = (duration: number, toast: ToastProps) => {
    let outerResolve: (value: void | PromiseLike<void>) => void;
    const promise = new Promise<void>((resolve) => {
      outerResolve = resolve;
    });

    setList((prevQueue) => [
      ...prevQueue,
      { ...toast, duration, resolve: outerResolve },
    ]);

    addToast(toast, promise);

    return promise;
  };

  return {
    promise,
    message,
  };
};
