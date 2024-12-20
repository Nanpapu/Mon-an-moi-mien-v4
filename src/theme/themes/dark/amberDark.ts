import { ThemeType } from '../types';

export const amberDarkTheme: ThemeType = {
  id: 'amber-dark',
  name: 'Tối hổ phách',
  icon: 'sunny-outline',
  colors: {
    primary: {
      main: '#FBBF24',
      light: '#FDE68A',
      dark: '#F59E0B',
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
      default: '#1A1A1A',
      paper: '#292929',
      contrast: '#FFFBEB',
    },
    text: {
      primary: '#FEF3C7',
      secondary: '#FDE68A',
      disabled: '#737373',
      contrast: '#1A1A1A',
    },
    divider: '#404040',
    border: '#525252',
    shadow: '#000000',
    action: {
      disabled: '#737373',
      hover: 'rgba(251, 191, 36, 0.12)',
      active: 'rgba(251, 191, 36, 0.2)',
    },
    info: {
      main: '#38BDF8',
      light: '#7DD3FC',
      dark: '#0EA5E9',
      contrast: '#000000',
    },
  },
};
