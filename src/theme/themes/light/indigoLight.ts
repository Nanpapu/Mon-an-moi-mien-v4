import { ThemeType } from '../types';

export const indigoLightTheme: ThemeType = {
  id: 'indigo-light',
  name: 'Sáng chàm',
  icon: 'color-palette-outline',
  colors: {
    primary: {
      main: '#6366F1',
      light: '#818CF8',
      dark: '#4F46E5',
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#64748B',
      light: '#94A3B8',
      dark: '#475569',
      contrast: '#FFFFFF',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
      contrast: '#FFFFFF',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
      contrast: '#000000',
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
      contrast: '#FFFFFF',
    },
    background: {
      default: '#EEF2FF',
      paper: '#FFFFFF',
      contrast: '#312E81',
    },
    text: {
      primary: '#1E1B4B',
      secondary: '#3730A3',
      disabled: '#94A3B8',
      contrast: '#FFFFFF',
    },
    divider: '#E0E7FF',
    border: '#C7D2FE',
    shadow: '#000000',
    action: {
      disabled: '#94A3B8',
      hover: 'rgba(99, 102, 241, 0.04)',
      active: 'rgba(99, 102, 241, 0.08)',
    },
    info: {
      main: '#0EA5E9',
      light: '#38BDF8',
      dark: '#0284C7',
      contrast: '#FFFFFF',
    },
  },
};
