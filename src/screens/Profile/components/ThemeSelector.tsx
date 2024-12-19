import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Typography } from '../../../components/shared';
import { useTheme } from '../../../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';

export const ThemeSelector = () => {
  const { currentTheme, setTheme, availableThemes, defaultLightTheme, defaultDarkTheme } = useTheme();
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);

  if (!user) return null;

  const lightThemes = availableThemes.filter(t => !t.id.includes('dark'));
  const darkThemes = availableThemes.filter(t => t.id.includes('dark'));

  const renderThemeButton = (theme: any, isDefaultTheme: boolean) => (
    <TouchableOpacity
      key={theme.id}
      style={[
        styles.themeButton,
        {
          backgroundColor: theme.colors.background.default,
          borderColor: theme.colors.border,
          borderWidth: 1,
        }
      ]}
      onPress={() => setTheme(theme.id)}
    >
      <View style={[styles.colorPreview, { backgroundColor: theme.colors.primary.main }]} />
      <Typography 
        variant="caption" 
        style={[
          styles.themeName,
          { color: theme.id.includes('dark') ? '#fff' : '#000' }
        ]}
      >
        {theme.name}
      </Typography>
      {isDefaultTheme && (
        <View style={[styles.defaultDot, { backgroundColor: theme.colors.primary.main }]} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
      >
        <Typography variant="h3">Bộ màu</Typography>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={24}
          color={currentTheme.colors.text.primary}
        />
      </TouchableOpacity>

      {expanded && (
        <>
          <View style={styles.section}>
            <Typography 
              variant="subtitle1" 
              style={[styles.sectionTitle, { color: currentTheme.colors.text.primary }]}
            >
              Chế độ sáng
            </Typography>
            <View style={styles.themeGrid}>
              {lightThemes.map(theme => renderThemeButton(theme, theme.id === defaultLightTheme))}
            </View>
          </View>

          <View style={styles.section}>
            <Typography 
              variant="subtitle1" 
              style={[styles.sectionTitle, { color: currentTheme.colors.text.primary }]}
            >
              Chế độ tối
            </Typography>
            <View style={styles.themeGrid}>
              {darkThemes.map(theme => renderThemeButton(theme, theme.id === defaultDarkTheme))}
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: '600',
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  themeButton: {
    width: 90,
    height: 90,
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  colorPreview: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginBottom: 8,
  },
  themeName: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 11,
  },
  defaultDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    top: 6,
    right: 6,
  },
}); 