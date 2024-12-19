import { ThemeType } from '../types';

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
      default: '#1F1F1F',
      paper: '#2D2D2D',
      contrast: '#FDF2F8',
    },
    text: {
      primary: '#FCE7F3',
      secondary: '#FBCFE8',
      disabled: '#737373',
      contrast: '#1F1F1F',
    },
    divider: '#404040',
    border: '#525252',
    shadow: '#000000',
    action: {
      disabled: '#737373',
      hover: 'rgba(244, 114, 182, 0.12)',
      active: 'rgba(244, 114, 182, 0.2)',
    },
    info: {
      main: '#38BDF8',
      light: '#7DD3FC',
      dark: '#0EA5E9',
      contrast: '#000000',
    },
  },
};
