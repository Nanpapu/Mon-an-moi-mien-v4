import { ThemeType } from '../types';

export const roseDarkTheme: ThemeType = {
  id: 'rose-dark',
  name: 'Tối hồng đỏ',
  icon: 'rose-outline',
  colors: {
    primary: {
      main: '#FB7185',
      light: '#FECDD3',
      dark: '#E11D48',
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
      default: '#1C1917',
      paper: '#292524',
      contrast: '#FFF1F2',
    },
    text: {
      primary: '#FFE4E6',
      secondary: '#FECDD3',
      disabled: '#78716C',
      contrast: '#1C1917',
    },
    divider: '#44403C',
    border: '#57534E',
    shadow: '#000000',
    action: {
      disabled: '#78716C',
      hover: 'rgba(251, 113, 133, 0.12)',
      active: 'rgba(251, 113, 133, 0.2)',
    },
    info: {
      main: '#38BDF8',
      light: '#7DD3FC',
      dark: '#0EA5E9',
      contrast: '#000000',
    },
  },
};
