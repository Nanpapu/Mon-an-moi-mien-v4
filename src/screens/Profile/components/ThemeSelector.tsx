import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Typography } from '../../../components/shared';
import { useTheme } from '../../../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';

export const ThemeSelector = () => {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const { user } = useAuth();

  // Nếu chưa đăng nhập, không hiển thị
  if (!user) return null;

  return (
    <View>
      <Typography variant="h3" style={{ marginBottom: 16 }}>
        Bộ màu
      </Typography>
      <View style={styles.themeGrid}>
        {availableThemes.map((theme) => (
          <TouchableOpacity
            key={theme.id}
            style={[
              styles.themeButton,
              {
                backgroundColor: theme.colors.background.default,
                borderColor: currentTheme.id === theme.id ? 
                  theme.colors.primary.main : 
                  theme.colors.border
              }
            ]}
            onPress={() => setTheme(theme.id)}
          >
            <View style={[
              styles.colorPreview,
              { backgroundColor: theme.colors.primary.main }
            ]} />
            <Typography 
              variant="caption"
              style={[
                styles.themeName,
                { color: theme.colors.text.primary }
              ]}
            >
              {theme.name}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  themeButton: {
    width: 100,
    height: 100,
    borderRadius: 16,
    borderWidth: 2,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
  },
  themeName: {
    textAlign: 'center',
  },
}); 