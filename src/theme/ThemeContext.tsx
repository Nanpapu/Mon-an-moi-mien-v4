// Context để quản lý theme trong ứng dụng
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useColorScheme, Animated, Easing } from "react-native";
import { lightColors} from "./colors";
import { typography } from "./typography";
import { spacing, layout } from "./spacing";
import { shadows } from "./shadows";
import { themes, ThemeType } from './themes';

// Định nghĩa kiểu dữ liệu cho theme
export type Theme = {
  colors: typeof lightColors;
  typography: typeof typography;
  spacing: typeof spacing;
  layout: typeof layout;
  shadows: typeof shadows;
  isDark: boolean;
  skeleton: {
    background: string;
  };
};

// Định nghĩa kiểu dữ liệu cho context
type ThemeContextType = {
  currentTheme: ThemeType;
  setTheme: (themeId: string) => void;
  availableThemes: ThemeType[];
  theme: Theme;
};

// Tạo context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component để cung cấp theme cho toàn ứng dụng
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(themes[0]);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const setTheme = (themeId: string) => {
    const newTheme = themes.find(t => t.id === themeId);
    if (!newTheme) return;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.98,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
    ]).start(() => {
      setCurrentTheme(newTheme);
      
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

  // Tạo theme cũ từ currentTheme
  const theme: Theme = {
    colors: currentTheme.colors,
    typography,
    spacing,
    layout,
    shadows,
    isDark: currentTheme.id !== 'light',
    skeleton: {
      background: currentTheme.colors.background.paper,
    },
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        currentTheme,
        setTheme,
        availableThemes: themes,
        theme
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          backgroundColor: currentTheme.colors.background.default,
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
