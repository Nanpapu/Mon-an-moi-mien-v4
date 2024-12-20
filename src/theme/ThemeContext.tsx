// Context để quản lý theme trong ứng dụng
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useColorScheme, Animated, Easing } from "react-native";
import { typography } from "./typography";
import { spacing, layout } from "./spacing";
import { shadows } from "./shadows";
import { themes, ThemeType, ThemeColors } from './themes';

// Định nghĩa kiểu dữ liệu cho theme
export type Theme = {
  colors: ThemeColors;
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
  defaultLightTheme: string;
  defaultDarkTheme: string;
  defaultSpecialTheme: string;
  setDefaultTheme: (themeId: string) => void;
  toggleTheme: () => void;
};

// Tạo context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component để cung cấp theme cho toàn ứng dụng
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(themes[0]);
  const [defaultLightTheme, setDefaultLightTheme] = useState('light');
  const [defaultDarkTheme, setDefaultDarkTheme] = useState('classic-dark');
  const [defaultSpecialTheme, setDefaultSpecialTheme] = useState('neon-dark-special');

  const setDefaultTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (!theme) return;
    
    if (theme.id.includes('-special')) {
      setDefaultSpecialTheme(theme.id);
    } else if (theme.id.includes('dark')) {
      setDefaultDarkTheme(theme.id);
    } else {
      setDefaultLightTheme(theme.id);
    }
  };

  const setTheme = (themeId: string) => {
    const newTheme = themes.find(t => t.id === themeId);
    if (!newTheme) return;
    setCurrentTheme(newTheme);
    setDefaultTheme(themeId);
  };

  const toggleTheme = () => {
    const currentIsSpecial = currentTheme.id.includes('-special');
    const currentIsDark = currentTheme.id.includes('dark');

    let newTheme;
    if (currentIsSpecial) {
      newTheme = themes.find(t => t.id === defaultLightTheme)!;
      setCurrentTheme(newTheme);
    } else if (currentIsDark) {
      newTheme = themes.find(t => t.id === defaultSpecialTheme)!;
      setCurrentTheme(newTheme);
    } else {
      newTheme = themes.find(t => t.id === defaultDarkTheme)!;
      setCurrentTheme(newTheme);
    }
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

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [currentTheme]);

  return (
    <ThemeContext.Provider 
      value={{ 
        currentTheme,
        setTheme,
        availableThemes: themes,
        theme,
        defaultLightTheme,
        defaultDarkTheme,
        defaultSpecialTheme,
        setDefaultTheme,
        toggleTheme,
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
