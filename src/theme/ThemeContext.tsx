import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors } from './colors';
import { typography } from './typography';
import { spacing, layout } from './spacing';
import { shadows } from './shadows';
import { Animated } from 'react-native';

export type Theme = {
  colors: typeof lightColors;
  typography: typeof typography;
  spacing: typeof spacing;
  layout: typeof layout;
  shadows: typeof shadows;
  isDark: boolean;
};

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const toggleTheme = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsDark(!isDark);
    });
  };

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
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        {children}
      </Animated.View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
