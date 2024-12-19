import { ThemeType } from '../types';

export const cyberpunkTheme: ThemeType = {
  id: 'cyberpunk-special',
  name: 'Cyberpunk',
  icon: 'hardware-chip-outline',
  colors: {
    primary: {
      main: '#F9E900', // Vàng neon
      light: '#FAF04D',
      dark: '#C7BA00',
      contrast: '#000000',
    },
    secondary: {
      main: '#00F0FF', // Xanh neon
      light: '#4DF4FF',
      dark: '#00C0CC',
      contrast: '#000000',
    },
    error: {
      main: '#FF073A',
      light: '#FF4D6E',
      dark: '#CC062E',
      contrast: '#000000',
    },
    warning: {
      main: '#FF00E4',
      light: '#FF4DEC',
      dark: '#CC00B6',
      contrast: '#000000',
    },
    success: {
      main: '#00FF9F',
      light: '#4DFFBC',
      dark: '#00CC7F',
      contrast: '#000000',
    },
    background: {
      default: '#0D0221', // Tím đen
      paper: '#1A0B2E',
      contrast: '#F9E900',
    },
    text: {
      primary: '#F9E900',
      secondary: '#00F0FF',
      disabled: '#4A4A4A',
      contrast: '#000000',
    },
    divider: '#2E1B47',
    border: '#3D2359',
    shadow: '#F9E90050',
    action: {
      disabled: '#4A4A4A',
      hover: 'rgba(249, 233, 0, 0.1)',
      active: 'rgba(249, 233, 0, 0.2)',
    },
    info: {
      main: '#00F0FF',
      light: '#4DF4FF',
      dark: '#00C0CC',
      contrast: '#000000',
    },
  },
}; 