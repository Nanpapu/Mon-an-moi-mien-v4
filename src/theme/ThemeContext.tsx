// Context để quản lý theme trong ứng dụng
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useColorScheme, Animated, Easing } from "react-native";
import { lightColors, darkColors } from "./colors";
import { typography } from "./typography";
import { spacing, layout } from "./spacing";
import { shadows } from "./shadows";

// Định nghĩa kiểu dữ liệu cho theme
export type Theme = {
  colors: typeof lightColors;
  typography: typeof typography;
  spacing: typeof spacing;
  layout: typeof layout;
  shadows: typeof shadows;
  isDark: boolean;
};

// Định nghĩa kiểu dữ liệu cho context
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// Tạo context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component để cung cấp theme cho toàn ứng dụng
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Lấy theme hệ thống
  const colorScheme = useColorScheme();
  // State quản lý theme tối/sáng
  const [isDark, setIsDark] = useState(colorScheme === "dark");
  // Animation khi chuyển theme
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Hàm chuyển đổi theme với animation
  const toggleTheme = () => {
    // Animation sequence khi chuyển theme
    Animated.parallel([
      // Fade out nhẹ nhàng
      Animated.timing(fadeAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      // Scale down rất nhẹ
      Animated.timing(scaleAnim, {
        toValue: 0.98,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
    ]).start(() => {
      // Sau khi animation kết thúc
      setIsDark(!isDark);

      // Animation trở về trạng thái ban đầu
      Animated.parallel([
        Animated.spring(fadeAnim, {
          toValue: 1,
          useNativeDriver: true,
          damping: 20,
          stiffness: 150,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          damping: 20,
          stiffness: 150,
        }),
      ]).start();
    });
  };

  // Tạo theme object
  const theme: Theme = {
    colors: isDark ? darkColors : lightColors,
    typography,
    spacing,
    layout,
    shadows,
    isDark,
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          backgroundColor: theme.colors.background.default,
        }}
      >
        {children}
      </Animated.View>
    </ThemeContext.Provider>
  );
};

// Hook để sử dụng theme trong components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
