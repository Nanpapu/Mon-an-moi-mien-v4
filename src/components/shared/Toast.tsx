import React, { useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Typography } from './Typography';
import { useTheme } from '../../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { ToastType } from '../../hooks/useToast';
import { THEME_CONSTANTS } from '../../theme/constants';

interface Props {
  visible: boolean;
  message: string;
  type: ToastType;
}

export const Toast = ({ visible, message, type }: Props) => {
  const { theme } = useTheme();
  const translateY = new Animated.Value(100);

  const getToastColor = () => {
    switch (type) {
      case 'success':
        return theme.colors.success.main;
      case 'error':
        return theme.colors.error.main;
      case 'warning':
        return theme.colors.warning.main;
      default:
        return theme.colors.info.main;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'checkmark-circle';
      case 'error':
        return 'alert-circle';
      case 'warning':
        return 'warning';
      default:
        return 'information-circle';
    }
  };

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 100,
        duration: THEME_CONSTANTS.animation.duration,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          backgroundColor: getToastColor(),
          bottom: THEME_CONSTANTS.layout.tabBarHeight + theme.spacing.md,
          left: theme.spacing.md,
          right: theme.spacing.md,
          padding: theme.spacing.md,
          borderRadius: THEME_CONSTANTS.layout.borderRadius.sm,
          ...theme.shadows.md,
        },
      ]}
    >
      <View style={styles.content}>
        <Ionicons
          name={getIcon()}
          size={24}
          color={theme.colors.text.contrast}
        />
        <Typography
          variant="body2"
          style={{
            color: theme.colors.text.contrast,
            marginLeft: theme.spacing.sm,
          }}
        >
          {message}
        </Typography>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    zIndex: 9999,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
