import { ThemeType } from '../types';

export const purpleDarkTheme: ThemeType = {
  id: 'purple-dark',
  name: 'Tối tím',
  icon: 'color-palette-outline',
  colors: {
    primary: {
      main: '#7C3AED',
      light: '#A78BFA',
      dark: '#5B21B6',
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#6B7280',
      light: '#9CA3AF',
      dark: '#4B5563',
      contrast: '#FFFFFF',
    },
    error: {
      main: '#EF4444',
      light: '#FCA5A5',
      dark: '#B91C1C',
      contrast: '#FFFFFF',
    },
    warning: {
      main: '#F59E0B',
      light: '#FCD34D',
      dark: '#B45309',
      contrast: '#000000',
    },
    success: {
      main: '#22C55E',
      light: '#86EFAC',
      dark: '#15803D',
      contrast: '#FFFFFF',
    },
    background: {
      default: '#18181B',
      paper: '#27272A',
      contrast: '#FFFFFF',
    },
    text: {
      primary: '#FAFAFA',
      secondary: '#A1A1AA',
      disabled: '#52525B',
      contrast: '#18181B',
    },
    divider: '#3F3F46',
    border: '#52525B',
    shadow: '#000000',
    action: {
      disabled: '#52525B',
      hover: 'rgba(255, 255, 255, 0.05)',
      active: 'rgba(255, 255, 255, 0.08)',
    },
    info: {
      main: '#06B6D4',
      light: '#67E8F9',
      dark: '#0891B2',
      contrast: '#FFFFFF',
    },
  },
};
