import { ThemeType } from '../types';

export const neutralDarkTheme: ThemeType = {
  id: 'neutral-dark',
  name: 'Tối trung tính',
  icon: 'contrast-outline',
  colors: {
    primary: {
      main: '#60A5FA',
      light: '#93C5FD',
      dark: '#2563EB',
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#94A3B8',
      light: '#CBD5E1',
      dark: '#64748B',
      contrast: '#FFFFFF',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
      contrast: '#FFFFFF',
    },
    warning: {
      main: '#FBBF24',
      light: '#FCD34D',
      dark: '#F59E0B',
      contrast: '#000000',
    },
    success: {
      main: '#34D399',
      light: '#6EE7B7',
      dark: '#10B981',
      contrast: '#FFFFFF',
    },
    background: {
      default: '#0F172A',
      paper: '#1E293B',
      contrast: '#F8FAFC',
    },
    text: {
      primary: '#E2E8F0',
      secondary: '#94A3B8',
      disabled: '#475569',
      contrast: '#0F172A',
    },
    divider: '#334155',
    border: '#475569',
    shadow: '#000000',
    action: {
      disabled: '#475569',
      hover: 'rgba(255, 255, 255, 0.05)',
      active: 'rgba(255, 255, 255, 0.08)',
    },
    info: {
      main: '#0EA5E9',
      light: '#38BDF8',
      dark: '#0284C7',
      contrast: '#FFFFFF',
    },
  },
};
