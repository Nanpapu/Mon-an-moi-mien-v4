import { ThemeType } from '../types';

export const blueLightTheme: ThemeType = {
  id: 'blue-light',
  name: 'Sáng xanh dương',
  icon: 'water-outline',
  colors: {
    primary: {
      main: '#2563EB', // Xanh dương đậm
      light: '#60A5FA', // Xanh dương nhạt
      dark: '#1D4ED8', // Xanh dương tối
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
      default: '#F0F9FF', // Nền xanh dương rất nhạt
      paper: '#FFFFFF',
      contrast: '#0C4A6E',
    },
    text: {
      primary: '#0F172A',
      secondary: '#475569',
      disabled: '#94A3B8',
      contrast: '#FFFFFF',
    },
    divider: '#E2E8F0',
    border: '#CBD5E1',
    shadow: '#000000',
    action: {
      disabled: '#94A3B8',
      hover: 'rgba(37, 99, 235, 0.04)',
      active: 'rgba(37, 99, 235, 0.08)',
    },
    info: {
      main: '#0EA5E9',
      light: '#38BDF8',
      dark: '#0284C7',
      contrast: '#FFFFFF',
    },
  },
};
