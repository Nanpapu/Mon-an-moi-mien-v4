import { ThemeType } from '../types';

export const lightTheme: ThemeType = {
  id: 'light',
  name: 'Chế độ sáng',
  icon: 'sunny-outline',
  colors: {
    primary: {
      main: '#007AFF',
      light: '#4DA3FF',
      dark: '#0055B3',
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#64748B',
      light: '#94A3B8',
      dark: '#475569',
      contrast: '#FFFFFF',
    },
    error: {
      main: '#DC2626',
      light: '#EF4444',
      dark: '#B91C1C',
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
      default: '#FFFFFF',
      paper: '#F8FAFC',
      contrast: '#1E293B',
    },
    text: {
      primary: '#0F172A',
      secondary: '#334155',
      disabled: '#94A3B8',
      contrast: '#FFFFFF',
    },
    divider: '#E2E8F0',
    border: '#CBD5E1',
    shadow: '#000000',
    action: {
      disabled: '#94A3B8',
      hover: 'rgba(0, 122, 255, 0.04)',
      active: 'rgba(0, 122, 255, 0.08)',
    },
    info: {
      main: '#0EA5E9',
      light: '#38BDF8',
      dark: '#0284C7',
      contrast: '#FFFFFF',
    },
  },
};
