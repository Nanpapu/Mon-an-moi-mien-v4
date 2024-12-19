import { ThemeType } from './types';

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
      default: '#451A03',
      paper: '#78350F',
      contrast: '#FFFBEB',
    },
    text: {
      primary: '#FEF3C7',
      secondary: '#FDE68A',
      disabled: '#92400E',
      contrast: '#451A03',
    },
    divider: '#92400E',
    border: '#B45309',
    shadow: '#000000',
    action: {
      disabled: '#92400E',
      hover: 'rgba(254, 243, 199, 0.05)',
      active: 'rgba(254, 243, 199, 0.08)',
    },
    info: {
      main: '#38BDF8',
      light: '#7DD3FC',
      dark: '#0EA5E9',
      contrast: '#000000',
    },
  },
};
