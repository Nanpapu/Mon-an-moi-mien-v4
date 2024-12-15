import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export const ThemedStatusBar = () => {
  const { theme } = useTheme();
  
  return (
    <StatusBar
      backgroundColor={theme.colors.background.default}
      barStyle={theme.isDark ? 'light-content' : 'dark-content'}
    />
  );
}; 