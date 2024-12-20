import { ThemeType } from '../types';

export const orangeLightTheme: ThemeType = {
  id: 'orange-light',
  name: 'Sáng cam',
  icon: 'flame-outline',
  colors: {
    primary: {
      main: '#F97316', // Cam đậm
      light: '#FB923C', // Cam nhạt
      dark: '#EA580C', // Cam tối
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
      default: '#FFF7ED', // Nền cam rất nhạt
      paper: '#FFFFFF',
      contrast: '#7C2D12',
    },
    text: {
      primary: '#431407',
      secondary: '#9A3412',
      disabled: '#94A3B8',
      contrast: '#FFFFFF',
    },
    divider: '#FFEDD5',
    border: '#FED7AA',
    shadow: '#000000',
    action: {
      disabled: '#94A3B8',
      hover: 'rgba(249, 115, 22, 0.04)',
      active: 'rgba(249, 115, 22, 0.08)',
    },
    info: {
      main: '#0EA5E9',
      light: '#38BDF8',
      dark: '#0284C7',
      contrast: '#FFFFFF',
    },
  },
};
