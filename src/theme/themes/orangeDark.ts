import { ThemeType } from './types';

export const orangeDarkTheme: ThemeType = {
  id: 'orange-dark',
  name: 'Tối cam',
  icon: 'flame-outline',
  colors: {
    primary: {
      main: '#FB923C', // Cam sáng
      light: '#FED7AA', // Cam rất sáng
      dark: '#F97316', // Cam đậm
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
      default: '#431407', // Nền cam tối
      paper: '#7C2D12', // Nền cam tối nhạt hơn
      contrast: '#FFF7ED',
    },
    text: {
      primary: '#FFEDD5',
      secondary: '#FED7AA',
      disabled: '#9A3412',
      contrast: '#431407',
    },
    divider: '#9A3412',
    border: '#C2410C',
    shadow: '#000000',
    action: {
      disabled: '#9A3412',
      hover: 'rgba(255, 237, 213, 0.05)',
      active: 'rgba(255, 237, 213, 0.08)',
    },
    info: {
      main: '#38BDF8',
      light: '#7DD3FC',
      dark: '#0EA5E9',
      contrast: '#000000',
    },
  },
};
