import { ThemeType } from '../types';

export const pinkLightTheme: ThemeType = {
  id: 'pink-light',
  name: 'Sáng hồng',
  icon: 'heart-outline',
  colors: {
    primary: {
      main: '#EC4899',
      light: '#F472B6',
      dark: '#DB2777',
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
      default: '#FDF2F8',
      paper: '#FFFFFF',
      contrast: '#831843',
    },
    text: {
      primary: '#500724',
      secondary: '#9D174D',
      disabled: '#94A3B8',
      contrast: '#FFFFFF',
    },
    divider: '#FCE7F3',
    border: '#FBCFE8',
    shadow: '#000000',
    action: {
      disabled: '#94A3B8',
      hover: 'rgba(236, 72, 153, 0.04)',
      active: 'rgba(236, 72, 153, 0.08)',
    },
    info: {
      main: '#0EA5E9',
      light: '#38BDF8',
      dark: '#0284C7',
      contrast: '#FFFFFF',
    },
  },
};
