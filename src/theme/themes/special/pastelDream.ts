import { ThemeType } from '../types';

export const pastelDreamTheme: ThemeType = {
  id: 'pastel-dream-special',
  name: 'Giấc Mơ Pastel',
  icon: 'color-palette-outline',
  colors: {
    primary: {
      main: '#FFB5E8', // Hồng pastel
      light: '#FFD1EF',
      dark: '#FF9DE0',
      contrast: '#000000',
    },
    secondary: {
      main: '#B5DEFF', // Xanh pastel
      light: '#D1E9FF',
      dark: '#9DD3FF',
      contrast: '#000000',
    },
    error: {
      main: '#FFB5B5',
      light: '#FFD1D1',
      dark: '#FF9D9D',
      contrast: '#000000',
    },
    warning: {
      main: '#FFE5B5',
      light: '#FFEED1',
      dark: '#FFDD9D',
      contrast: '#000000',
    },
    success: {
      main: '#B5FFB5',
      light: '#D1FFD1',
      dark: '#9DFF9D',
      contrast: '#000000',
    },
    background: {
      default: '#FFF9FC', // Trắng hồng nhạt
      paper: '#FFFFFF',
      contrast: '#FFB5E8',
    },
    text: {
      primary: '#7A5C75',
      secondary: '#9B7B96',
      disabled: '#C3ABC0',
      contrast: '#FFFFFF',
    },
    divider: '#FFE5F3',
    border: '#FFD1EF',
    shadow: '#FFB5E850',
    action: {
      disabled: '#C3ABC0',
      hover: 'rgba(255, 181, 232, 0.1)',
      active: 'rgba(255, 181, 232, 0.2)',
    },
    info: {
      main: '#B5DEFF',
      light: '#D1E9FF',
      dark: '#9DD3FF',
      contrast: '#000000',
    },
  },
}; 