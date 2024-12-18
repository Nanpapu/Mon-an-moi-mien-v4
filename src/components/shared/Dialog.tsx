import React, { useEffect, useRef } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
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
  type?: 'default' | 'danger' | 'success';
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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

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
      <TouchableOpacity
        style={[styles.overlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}
        onPress={onCancel}
        activeOpacity={1}
      >
        <Animated.View
          style={[
            styles.dialog,
            {
              backgroundColor: theme.colors.background.paper,
              ...theme.shadows.lg,
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            }
          ]}
        >
          <View style={styles.content}>
            <Typography 
              variant="h3" 
              style={{ 
                marginBottom: theme.spacing.sm,
                textAlign: 'center' 
              }}
            >
              {title}
            </Typography>
            
            <Typography
              variant="body2"
              color="secondary"
              style={{ 
                marginBottom: theme.spacing.lg,
                textAlign: 'center',
                paddingHorizontal: theme.spacing.sm 
              }}
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
                variant="primary"
                onPress={onConfirm}
                style={{ 
                  flex: 1,
                  backgroundColor: getButtonColor()
                }}
              >
                {confirmText}
              </Button>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
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
    width: '85%',
    maxWidth: 340,
    borderRadius: 16,
    overflow: 'hidden',
  },
  content: {
    padding: 24,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
}); 