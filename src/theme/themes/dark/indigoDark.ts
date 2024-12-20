import { ThemeType } from '../types';

export const indigoDarkTheme: ThemeType = {
  id: 'indigo-dark',
  name: 'Tối chàm',
  icon: 'color-palette-outline',
  colors: {
    primary: {
      main: '#818CF8',
      light: '#C7D2FE',
      dark: '#6366F1',
      contrast: '#000000',
    },
    secondary: {
      main: '#94A3B8',
      light: '#CBD5E1',
      dark: '#64748B',
      contrast: '#000000',
    },
    error: {
      main: '#F87171',
      light: '#FCA5A5',
      dark: '#EF4444',
      contrast: '#000000',
    },
    warning: {
      main: '#FBBF24',
      light: '#FDE68A',
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
      default: '#18181B',
      paper: '#27272A',
      contrast: '#EEF2FF',
    },
    text: {
      primary: '#E0E7FF',
      secondary: '#C7D2FE',
      disabled: '#71717A',
      contrast: '#18181B',
    },
    divider: '#3F3F46',
    border: '#52525B',
    shadow: '#000000',
    action: {
      disabled: '#71717A',
      hover: 'rgba(129, 140, 248, 0.12)',
      active: 'rgba(129, 140, 248, 0.2)',
    },
    info: {
      main: '#38BDF8',
      light: '#7DD3FC',
      dark: '#0EA5E9',
      contrast: '#000000',
    },
  },
};
