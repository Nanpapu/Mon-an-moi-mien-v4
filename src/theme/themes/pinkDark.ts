import { ThemeType } from './types';

export const pinkDarkTheme: ThemeType = {
  id: 'pink-dark',
  name: 'Tối hồng',
  icon: 'heart-outline',
  colors: {
    primary: {
      main: '#F472B6',
      light: '#FBCFE8',
      dark: '#EC4899',
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
      default: '#500724',
      paper: '#831843',
      contrast: '#FDF2F8',
    },
    text: {
      primary: '#FCE7F3',
      secondary: '#FBCFE8',
      disabled: '#9D174D',
      contrast: '#500724',
    },
    divider: '#9D174D',
    border: '#BE185D',
    shadow: '#000000',
    action: {
      disabled: '#9D174D',
      hover: 'rgba(252, 231, 243, 0.05)',
      active: 'rgba(252, 231, 243, 0.08)',
    },
    info: {
      main: '#38BDF8',
      light: '#7DD3FC',
      dark: '#0EA5E9',
      contrast: '#000000',
    },
  },
};
