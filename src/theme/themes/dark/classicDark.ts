import { ThemeType } from '../types';

export const classicDarkTheme: ThemeType = {
  id: 'classic-dark',
  name: 'Tối cổ điển',
  icon: 'moon-outline',
  colors: {
    primary: {
      main: '#60A5FA',
      light: '#93C5FD',
      dark: '#2563EB',
      contrast: '#000000',
    },
    secondary: {
      main: '#94A3B8',
      light: '#CBD5E1',
      dark: '#64748B',
      contrast: '#000000',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
      contrast: '#000000',
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
      contrast: '#000000',
    },
    background: {
      default: '#1A1B1E',
      paper: '#27282B',
      contrast: '#FFFFFF',
    },
    text: {
      primary: '#E6E8EC',
      secondary: '#A1A5AC',
      disabled: '#696C72',
      contrast: '#1A1B1E',
    },
    divider: '#383A3F',
    border: '#4A4D52',
    shadow: '#000000',
    action: {
      disabled: '#696C72',
      hover: 'rgba(255, 255, 255, 0.08)',
      active: 'rgba(255, 255, 255, 0.12)',
    },
    info: {
      main: '#0EA5E9',
      light: '#38BDF8',
      dark: '#0284C7',
      contrast: '#FFFFFF',
    },
  },
};
