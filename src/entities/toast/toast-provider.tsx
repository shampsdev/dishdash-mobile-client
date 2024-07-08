import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { InternalToastProps, Toast, ToastProps } from './ui';

interface ContextProps {
  addToast: (toast: ToastProps, promise: Promise<void>) => void;
  activeToast: (ToastProps & InternalToastProps) | null;
}

export const ToastContext = React.createContext<ContextProps>({
  addToast: () => {},
  activeToast: null,
});

interface ToastProviderProps {
  children?: JSX.Element;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [queue, setQueue] = useState<(ToastProps & InternalToastProps)[]>([]);
  const [activeToast, setActiveToast] = useState<
    (ToastProps & InternalToastProps) | null
  >(null);

  const addToast = useCallback((toast: ToastProps, promise: Promise<void>) => {
    setQueue((prevQueue) => [...prevQueue, { ...toast, promise }]);
  }, []);

  useEffect(() => {
    if (!activeToast && queue.length > 0) {
      const [nextToast, ...remainingQueue] = queue;
      setQueue(remainingQueue);

      nextToast.promise.finally(() => {
        setTimeout(() => {
          setActiveToast(null);
        }, 1000);
      });

      setActiveToast({ ...nextToast });
    }
  }, [queue, activeToast]);

  const contextValue = useMemo(
    () => ({ addToast, activeToast }),
    [addToast, activeToast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {activeToast && <Toast index={0} {...activeToast} />}
      {children}
    </ToastContext.Provider>
  );
};
