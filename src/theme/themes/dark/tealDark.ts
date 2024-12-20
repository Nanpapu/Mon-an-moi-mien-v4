import { ThemeType } from '../types';

export const tealDarkTheme: ThemeType = {
  id: 'teal-dark',
  name: 'Tối xanh ngọc',
  icon: 'water-outline',
  colors: {
    primary: {
      main: '#2DD4BF',
      light: '#99F6E4',
      dark: '#14B8A6',
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
      default: '#171717',
      paper: '#262626',
      contrast: '#F0FDFA',
    },
    text: {
      primary: '#CCFBF1',
      secondary: '#99F6E4',
      disabled: '#737373',
      contrast: '#171717',
    },
    divider: '#404040',
    border: '#525252',
    shadow: '#000000',
    action: {
      disabled: '#737373',
      hover: 'rgba(45, 212, 191, 0.12)',
      active: 'rgba(45, 212, 191, 0.2)',
    },
    info: {
      main: '#38BDF8',
      light: '#7DD3FC',
      dark: '#0EA5E9',
      contrast: '#000000',
    },
  },
};
