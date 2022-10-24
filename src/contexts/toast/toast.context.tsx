import { createContext, useCallback } from 'react';
import { toast, ToastContainer } from 'react-toastify';

interface Context {
  error: (content: string) => string;
  info: (content: string) => string;
  success: (content: string) => string;
  warn: (content: string) => string;
}
export const ToastContext = createContext<Context>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const error = useCallback((content: string) => {
    const id = toast.error(content);
    return String(id);
  }, []);

  const info = useCallback((content: string) => {
    const id = toast.info(content);
    return String(id);
  }, []);

  const warn = useCallback((content: string) => {
    const id = toast.warn(content);
    return String(id);
  }, []);

  const success = useCallback((content: string) => {
    const id = toast.success(content);
    return String(id);
  }, []);

  return (
    <ToastContext.Provider
      value={{
        error,
        info,
        success,
        warn,
      }}
    >
      <>
        {children}
        <ToastContainer hideProgressBar position='bottom-right' autoClose={2000} />
      </>
    </ToastContext.Provider>
  );
};
