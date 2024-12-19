import { ThemeType } from './types';

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
      default: '#4C0519',
      paper: '#881337',
      contrast: '#FFF1F2',
    },
    text: {
      primary: '#FFE4E6',
      secondary: '#FECDD3',
      disabled: '#9F1239',
      contrast: '#4C0519',
    },
    divider: '#9F1239',
    border: '#BE123C',
    shadow: '#000000',
    action: {
      disabled: '#9F1239',
      hover: 'rgba(255, 228, 230, 0.05)',
      active: 'rgba(255, 228, 230, 0.08)',
    },
    info: {
      main: '#38BDF8',
      light: '#7DD3FC',
      dark: '#0EA5E9',
      contrast: '#000000',
    },
  },
};
