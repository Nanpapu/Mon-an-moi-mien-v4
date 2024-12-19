import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Typography } from '../../../components/shared';
import { useTheme } from '../../../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export const ThemeToggle = () => {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  
  return (
    <View>
      <Typography variant="h3" style={{ marginBottom: 16 }}>
        Giao diện
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
            name={theme.icon as any}
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