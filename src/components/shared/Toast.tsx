import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { Typography } from "./";
import { useTheme } from "../../theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onHide: () => void;
}

export const Toast = ({
  message,
  type = "info",
  duration = 3000,
  onHide,
}: ToastProps) => {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 20,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => onHide());
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const getToastStyle = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: theme.colors.success.main,
          icon: 'checkmark-circle' as keyof typeof Ionicons.glyphMap,
        };
      case 'error':
        return {
          backgroundColor: theme.colors.error.main,
          icon: 'alert-circle' as keyof typeof Ionicons.glyphMap,
        };
      default:
        return {
          backgroundColor: theme.colors.primary.main,
          icon: 'information-circle' as keyof typeof Ionicons.glyphMap,
        };
    }
  };

  const toastStyle = getToastStyle();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: toastStyle.backgroundColor,
          ...theme.shadows.md,
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
    >
      <Ionicons
        name={toastStyle.icon}
        size={24}
        color={theme.colors.background.contrast}
        style={styles.icon}
      />
      <Typography variant="body2" style={styles.message}>
        {message}
      </Typography>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  icon: {
    marginRight: 16,
  },
  message: {
    flex: 1,
  },
});
