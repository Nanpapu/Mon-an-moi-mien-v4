import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '../../theme/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{
        padding: 8,
        borderRadius: 20,
      }}
    >
      <Ionicons
        name={theme.isDark ? "sunny-outline" : "moon-outline"}
        size={24}
        color={theme.colors.text.primary}
      />
    </TouchableOpacity>
  );
}; 