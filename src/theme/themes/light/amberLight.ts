import { ThemeType } from '../types';

export const amberLightTheme: ThemeType = {
  id: 'amber-light',
  name: 'Sáng hổ phách',
  icon: 'sunny-outline',
  colors: {
    primary: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
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
      default: '#FFFBEB',
      paper: '#FFFFFF',
      contrast: '#78350F',
    },
    text: {
      primary: '#451A03',
      secondary: '#92400E',
      disabled: '#94A3B8',
      contrast: '#FFFFFF',
    },
    divider: '#FEF3C7',
    border: '#FDE68A',
    shadow: '#000000',
    action: {
      disabled: '#94A3B8',
      hover: 'rgba(245, 158, 11, 0.04)',
      active: 'rgba(245, 158, 11, 0.08)',
    },
    info: {
      main: '#0EA5E9',
      light: '#38BDF8',
      dark: '#0284C7',
      contrast: '#FFFFFF',
    },
  },
};
