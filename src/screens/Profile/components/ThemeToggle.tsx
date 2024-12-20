import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Typography } from '../../../components/shared';
import { useTheme } from '../../../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useToast } from '../../../hooks/useToast';

export const ThemeToggle = () => {
  const { currentTheme, toggleTheme, availableThemes, setTheme } = useTheme();
  const { showToast } = useToast();
  
  const getThemeIcon = (themeId: string) => {
    if (themeId.includes('-special')) {
      return 'star';
    } else if (themeId.includes('dark')) {
      return 'moon';
    }
    return 'sunny';
  };

  const handleToggle = () => {
    const currentIsSpecial = currentTheme.id.includes('-special');
    const currentIsDark = currentTheme.id.includes('dark');

    let nextThemeName = '';
    if (currentIsSpecial) {
      nextThemeName = 'Chế độ sáng';
    } else if (currentIsDark) {
      nextThemeName = 'Chế độ đặc biệt';
    } else {
      nextThemeName = 'Chế độ tối';
    }

    toggleTheme();
    setTimeout(() => {
      showToast('info', `Đã chuyển sang ${nextThemeName}`);
    }, 100);
  };
  
  return (
    <View>
      <TouchableOpacity 
        style={styles.toggleButton}
        onPress={handleToggle}
      >
        <Ionicons 
          name={getThemeIcon(currentTheme.id)}
          size={24}
          color={currentTheme.colors.text.primary}
        />
        <Typography 
          variant="body1" 
          style={{ marginLeft: 12 }}
        >
          Chuyển chế độ
        </Typography>
      </TouchableOpacity>

      <Typography variant="h3" style={{ marginBottom: 16, marginTop: 24 }}>
        Tất cả giao diện
      </Typography>
      {availableThemes.map((theme) => (
        <TouchableOpacity
          key={theme.id}
          style={[
            styles.themeOption,
            currentTheme.id === theme.id && styles.selectedTheme
          ]}
          onPress={() => setTheme(theme.id)}
        >
          <Ionicons 
            name={getThemeIcon(theme.id)}
            size={24}
            color={theme.colors.text.primary}
          />
          <Typography 
            variant="body1" 
            style={{ marginLeft: 12 }}
          >
            {theme.name}
          </Typography>
          {currentTheme.id === theme.id && (
            <Ionicons
              name="checkmark"
              size={24}
              color={theme.colors.primary.main}
              style={{ marginLeft: 'auto' }}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedTheme: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
}); 