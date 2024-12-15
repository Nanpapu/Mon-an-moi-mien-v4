import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography, Button } from './';
import { useTheme } from '../../theme/ThemeContext';

interface DialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  type?: 'default' | 'danger';
}

export const Dialog = ({
  visible,
  title,
  message,
  confirmText = 'OK',
  cancelText = 'Hủy',
  onConfirm,
  onCancel,
  type = 'default'
}: DialogProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.lg,
    },
    dialog: {
      width: '80%',
      maxWidth: 400,
      padding: theme.spacing.lg,
      borderRadius: theme.spacing.md,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: theme.spacing.lg,
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableOpacity
        style={[
          styles.overlay,
          { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
        ]}
        onPress={onCancel}
        activeOpacity={1}
      >
        <View
          style={[
            styles.dialog,
            {
              backgroundColor: theme.colors.background.paper,
              ...theme.shadows.lg,
            }
          ]}
        >
          <Typography variant="h3" style={{ marginBottom: theme.spacing.sm }}>
            {title}
          </Typography>
          
          <Typography
            variant="body2"
            color="secondary"
            style={{ marginBottom: theme.spacing.lg }}
          >
            {message}
          </Typography>

          <View style={styles.actions}>
            {onCancel && (
              <Button
                variant="outline"
                onPress={onCancel}
                style={{ flex: 1, marginRight: theme.spacing.sm }}
              >
                {cancelText}
              </Button>
            )}
            <Button
              variant={type === 'danger' ? 'secondary' : 'primary'}
              onPress={onConfirm}
              style={{ flex: 1 }}
            >
              {confirmText}
            </Button>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}; 