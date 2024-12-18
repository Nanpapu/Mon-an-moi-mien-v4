import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Typography } from './Typography';
import { useTheme } from '../../theme/ThemeContext';

interface DialogProps {
  visible: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'default' | 'danger' | 'success';
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const Dialog = ({
  visible,
  title,
  message,
  confirmText = 'Đồng ý',
  cancelText = 'Hủy',
  type = 'default',
  onConfirm,
  onCancel,
}: DialogProps) => {
  const { theme } = useTheme();

  const getButtonColor = () => {
    switch (type) {
      case 'danger':
        return theme.colors.error.main;
      case 'success':
        return theme.colors.success.main;
      default:
        return theme.colors.primary.main;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={[styles.overlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
        <View
          style={[
            styles.dialog,
            {
              backgroundColor: theme.colors.background.paper,
              ...theme.shadows.lg,
            },
          ]}
        >
          {title && (
            <Typography variant="h3" style={styles.title}>
              {title}
            </Typography>
          )}

          <Typography variant="body1" style={styles.message}>
            {message}
          </Typography>

          <View style={styles.buttonContainer}>
            {cancelText && (
              <TouchableOpacity
                style={[styles.button, { borderColor: theme.colors.divider }]}
                onPress={onCancel}
              >
                <Typography variant="body1" color="secondary">
                  {cancelText}
                </Typography>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button, { backgroundColor: getButtonColor() }]}
              onPress={onConfirm}
            >
              <Typography
                variant="body1"
                style={{ color: theme.colors.background.paper }}
              >
                {confirmText}
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    width: '80%',
    borderRadius: 8,
    padding: 16,
  },
  title: {
    marginBottom: 12,
  },
  message: {
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
});
