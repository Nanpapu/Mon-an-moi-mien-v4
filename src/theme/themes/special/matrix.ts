import { ThemeType } from '../types';

export const matrixTheme: ThemeType = {
  id: 'matrix-special',
  name: 'Matrix',
  icon: 'code-outline',
  colors: {
    primary: {
      main: '#00FF41', // Xanh lá Matrix
      light: '#4DFF75',
      dark: '#00CC34',
      contrast: '#000000',
    },
    secondary: {
      main: '#008F11',
      light: '#00B315',
      dark: '#006B0D',
      contrast: '#FFFFFF',
    },
    error: {
      main: '#FF0000',
      light: '#FF4D4D',
      dark: '#CC0000',
      contrast: '#000000',
    },
    warning: {
      main: '#FFA500',
      light: '#FFB84D',
      dark: '#CC8400',
      contrast: '#000000',
    },
    success: {
      main: '#00FF41',
      light: '#4DFF75',
      dark: '#00CC34',
      contrast: '#000000',
    },
    background: {
      default: '#0D0208', // Đen Matrix
      paper: '#1A1A1A',
      contrast: '#00FF41',
    },
    text: {
      primary: '#00FF41',
      secondary: '#008F11',
      disabled: '#003B00',
      contrast: '#000000',
    },
    divider: '#003B00',
    border: '#008F11',
    shadow: '#00FF4150',
    action: {
      disabled: '#003B00',
      hover: 'rgba(0, 255, 65, 0.1)',
      active: 'rgba(0, 255, 65, 0.2)',
    },
    info: {
      main: '#008F11',
      light: '#00B315',
      dark: '#006B0D',
      contrast: '#FFFFFF',
    },
  },
}; 