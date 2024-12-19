import { ThemeType } from '../types';

export const neonDarkTheme: ThemeType = {
  id: 'neon-dark-special',
  name: 'Tối Neon',
  icon: 'flash-outline',
  colors: {
    primary: {
      main: '#FF00FF', // Màu neon hồng
      light: '#FF66FF',
      dark: '#CC00CC',
      contrast: '#000000',
    },
    secondary: {
      main: '#00FFFF', // Màu neon xanh
      light: '#66FFFF',
      dark: '#00CCCC',
      contrast: '#000000',
    },
    error: {
      main: '#FF0000',
      light: '#FF6666',
      dark: '#CC0000',
      contrast: '#000000',
    },
    warning: {
      main: '#FFFF00',
      light: '#FFFF66',
      dark: '#CCCC00',
      contrast: '#000000',
    },
    success: {
      main: '#00FF00',
      light: '#66FF66',
      dark: '#00CC00',
      contrast: '#000000',
    },
    background: {
      default: '#0A0A0A',
      paper: '#1A1A1A',
      contrast: '#FFFFFF',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
      disabled: '#666666',
      contrast: '#000000',
    },
    divider: '#333333',
    border: '#444444',
    shadow: '#FF00FF50',
    action: {
      disabled: '#666666',
      hover: 'rgba(255, 0, 255, 0.1)',
      active: 'rgba(255, 0, 255, 0.2)',
    },
    info: {
      main: '#00FFFF',
      light: '#66FFFF',
      dark: '#00CCCC',
      contrast: '#000000',
    },
  },
}; 