import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '../../theme/ThemeContext';

export const ThemeToggle = () => {
  const { theme, currentTheme, toggleTheme } = useTheme();
  
  // Hàm helper để xác định icon dựa vào theme ID
  const getThemeIcon = () => {
    if (currentTheme.id.includes('-special')) {
      return "star-outline";
    } else if (theme.isDark) {
      return "moon-outline";
    }
    return "sunny-outline";
  };
  
  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.05)',
      }}
    >
      <Ionicons
        name={getThemeIcon()}
        size={24}
        color={theme.colors.text.primary}
      />
    </TouchableOpacity>
  );
}; 