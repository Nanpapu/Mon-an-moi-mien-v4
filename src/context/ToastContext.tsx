import React, { createContext, useState, useCallback } from 'react';
import { Toast } from '../components/shared/Toast';
import { ToastType } from '../hooks/useToast';

interface ToastContextType {
  showToast: (type: ToastType, message: string) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('success');

  const showToast = useCallback(
    (toastType: ToastType, toastMessage: string) => {
      setType(toastType);
      setMessage(toastMessage);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 3000);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast visible={visible} message={message} type={type} />
    </ToastContext.Provider>
  );
};
