import React from 'react';
import {
  Modal as RNModal,
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  showCloseButton?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
}

export const Modal = ({
  visible,
  onClose,
  children,
  style,
  showCloseButton = true,
  animationType = 'fade',
}: ModalProps) => {
  const { theme } = useTheme();

  return (
    <RNModal
      visible={visible}
      transparent
      animationType={animationType}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.content,
            {
              backgroundColor: theme.colors.background.paper,
              ...theme.shadows.lg,
            },
            style,
          ]}
        >
          {showCloseButton && (
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.text.secondary}
              />
            </TouchableOpacity>
          )}
          {children}
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    borderRadius: 12,
    padding: 16,
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1,
  },
});
