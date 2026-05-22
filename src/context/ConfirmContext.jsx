import { createContext, useCallback, useContext, useRef, useState } from 'react';
import ConfirmDialog from '../components/common/ConfirmDialog';

const ConfirmContext = createContext(null);

export const useConfirm = () => {
  const ctx = useContext(ConfirmContext);
  if (!ctx) {
    throw new Error('useConfirm must be used within ConfirmProvider');
  }
  return ctx.confirm;
};

export const ConfirmProvider = ({ children }) => {
  const [options, setOptions] = useState(null);
  const resolveRef = useRef(null);

  const confirm = useCallback((opts) => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      setOptions({
        title: 'Confirm',
        confirmLabel: 'Confirm',
        cancelLabel: 'Cancel',
        variant: 'default',
        ...opts,
      });
    });
  }, []);

  const finish = (result) => {
    setOptions(null);
    const resolve = resolveRef.current;
    resolveRef.current = null;
    resolve?.(result);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <ConfirmDialog
        open={!!options}
        title={options?.title}
        message={options?.message}
        confirmLabel={options?.confirmLabel}
        cancelLabel={options?.cancelLabel}
        variant={options?.variant}
        onConfirm={() => finish(true)}
        onCancel={() => finish(false)}
      />
    </ConfirmContext.Provider>
  );
};
