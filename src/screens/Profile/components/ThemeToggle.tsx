import React from 'react';
import { View } from 'react-native';
import { Button } from '../../../components/shared';
import { useTheme } from '../../../theme/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button
      variant="outline"
      icon={theme.isDark ? "sunny-outline" : "moon-outline"}
      onPress={toggleTheme}
      style={{ marginTop: theme.spacing.md }}
    >
      {theme.isDark ? "Chế độ sáng" : "Chế độ tối"}
    </Button>
  );
}; 