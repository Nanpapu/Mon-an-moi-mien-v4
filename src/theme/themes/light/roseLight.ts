import { ThemeType } from '../types';

export const roseLightTheme: ThemeType = {
  id: 'rose-light',
  name: 'Sáng hồng đỏ',
  icon: 'rose-outline',
  colors: {
    primary: {
      main: '#E11D48',
      light: '#FB7185',
      dark: '#BE123C',
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
      default: '#FFF1F2',
      paper: '#FFFFFF',
      contrast: '#881337',
    },
    text: {
      primary: '#4C0519',
      secondary: '#9F1239',
      disabled: '#94A3B8',
      contrast: '#FFFFFF',
    },
    divider: '#FFE4E6',
    border: '#FECDD3',
    shadow: '#000000',
    action: {
      disabled: '#94A3B8',
      hover: 'rgba(225, 29, 72, 0.04)',
      active: 'rgba(225, 29, 72, 0.08)',
    },
    info: {
      main: '#0EA5E9',
      light: '#38BDF8',
      dark: '#0284C7',
      contrast: '#FFFFFF',
    },
  },
};
