import { useState, useCallback } from 'react';

interface DialogOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'default' | 'danger' | 'success';
}

interface DialogConfig extends DialogOptions {
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const useDialog = () => {
  const [visible, setVisible] = useState(false);
  const [dialogConfig, setDialogConfig] = useState<DialogConfig>({
    title: '',
    message: '',
  });

  const showDialog = useCallback((options: DialogOptions) => {
    return new Promise<boolean>((resolve) => {
      setDialogConfig({
        ...options,
        onConfirm: () => {
          setVisible(false);
          resolve(true);
        },
        onCancel: () => {
          setVisible(false);
          resolve(false);
        },
      });
      setVisible(true);
    });
  }, []);

  const hideDialog = useCallback(() => {
    setVisible(false);
  }, []);

  const confirm = useCallback(
    async (options: DialogOptions) => {
      return showDialog({
        confirmText: 'Đồng ý',
        cancelText: 'Hủy',
        type: 'default',
        ...options,
      });
    },
    [showDialog]
  );

  const alert = useCallback(
    async (options: DialogOptions | string) => {
      const config =
        typeof options === 'string' ? { message: options } : options;
      return showDialog({
        title: 'Thông báo',
        confirmText: 'OK',
        type: 'default',
        ...config,
        cancelText: undefined,
      });
    },
    [showDialog]
  );

  return {
    visible,
    dialogConfig,
    showDialog,
    hideDialog,
    confirm,
    alert,
  };
};
