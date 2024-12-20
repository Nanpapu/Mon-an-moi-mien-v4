import { ThemeType } from '../types';

export const forestTheme: ThemeType = {
  id: 'forest-special',
  name: 'Rừng Rậm',
  icon: 'leaf-outline',
  colors: {
    primary: {
      main: '#2D5A27', // Xanh lá rừng
      light: '#3B7A35',
      dark: '#1F3D1B',
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#8B4513', // Nâu gỗ
      light: '#A5632D',
      dark: '#6E370F',
      contrast: '#FFFFFF',
    },
    error: {
      main: '#A94442',
      light: '#C35F5D',
      dark: '#8A3634',
      contrast: '#FFFFFF',
    },
    warning: {
      main: '#C1A344',
      light: '#D4BC6D',
      dark: '#9B8236',
      contrast: '#000000',
    },
    success: {
      main: '#3C763D',
      light: '#4F944F',
      dark: '#2F5B2F',
      contrast: '#FFFFFF',
    },
    background: {
      default: '#1C2E1C', // Xanh đen rừng
      paper: '#263826',
      contrast: '#FFFFFF',
    },
    text: {
      primary: '#E8F5E8',
      secondary: '#B8D8B8',
      disabled: '#5A715A',
      contrast: '#1C2E1C',
    },
    divider: '#2F462F',
    border: '#3D573D',
    shadow: '#2D5A2750',
    action: {
      disabled: '#5A715A',
      hover: 'rgba(45, 90, 39, 0.1)',
      active: 'rgba(45, 90, 39, 0.2)',
    },
    info: {
      main: '#31708F',
      light: '#4A8BA8',
      dark: '#275973',
      contrast: '#FFFFFF',
    },
  },
}; 