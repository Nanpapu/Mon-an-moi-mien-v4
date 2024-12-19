import { ThemeType } from '../types';

export const tealLightTheme: ThemeType = {
  id: 'teal-light',
  name: 'Sáng xanh ngọc',
  icon: 'water-outline',
  colors: {
    primary: {
      main: '#14B8A6',
      light: '#2DD4BF',
      dark: '#0D9488',
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
      default: '#F0FDFA',
      paper: '#FFFFFF',
      contrast: '#134E4A',
    },
    text: {
      primary: '#042F2E',
      secondary: '#115E59',
      disabled: '#94A3B8',
      contrast: '#FFFFFF',
    },
    divider: '#CCFBF1',
    border: '#99F6E4',
    shadow: '#000000',
    action: {
      disabled: '#94A3B8',
      hover: 'rgba(20, 184, 166, 0.04)',
      active: 'rgba(20, 184, 166, 0.08)',
    },
    info: {
      main: '#0EA5E9',
      light: '#38BDF8',
      dark: '#0284C7',
      contrast: '#FFFFFF',
    },
  },
};
