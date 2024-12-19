import { ThemeType } from '../types';

export const greenLightTheme: ThemeType = {
  id: 'green-light',
  name: 'Sáng xanh lá',
  icon: 'leaf-outline',
  colors: {
    primary: {
      main: '#059669', // Xanh lá đậm
      light: '#34D399', // Xanh lá nhạt
      dark: '#047857', // Xanh lá tối
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#6B7280',
      light: '#9CA3AF',
      dark: '#4B5563',
      contrast: '#FFFFFF',
    },
    error: {
      main: '#DC2626',
      light: '#EF4444',
      dark: '#B91C1C',
      contrast: '#FFFFFF',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
      contrast: '#000000',
    },
    success: {
      main: '#059669',
      light: '#34D399',
      dark: '#047857',
      contrast: '#FFFFFF',
    },
    background: {
      default: '#ECFDF5', // Nền xanh lá rất nhạt
      paper: '#FFFFFF',
      contrast: '#064E3B',
    },
    text: {
      primary: '#064E3B',
      secondary: '#047857',
      disabled: '#94A3B8',
      contrast: '#FFFFFF',
    },
    divider: '#D1FAE5',
    border: '#A7F3D0',
    shadow: '#000000',
    action: {
      disabled: '#94A3B8',
      hover: 'rgba(5, 150, 105, 0.04)',
      active: 'rgba(5, 150, 105, 0.08)',
    },
    info: {
      main: '#0EA5E9',
      light: '#38BDF8',
      dark: '#0284C7',
      contrast: '#FFFFFF',
    },
  },
};
