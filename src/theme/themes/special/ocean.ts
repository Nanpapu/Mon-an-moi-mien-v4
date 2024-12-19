import { ThemeType } from '../types';

export const oceanTheme: ThemeType = {
  id: 'ocean-special',
  name: 'Đại Dương',
  icon: 'water-outline',
  colors: {
    primary: {
      main: '#006994', // Xanh biển
      light: '#0086BA',
      dark: '#004D6E',
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#40E0D0', // Ngọc lam
      light: '#66E7DB',
      dark: '#33B3A6',
      contrast: '#000000',
    },
    error: {
      main: '#FF6B6B',
      light: '#FF9B9B',
      dark: '#CC5555',
      contrast: '#FFFFFF',
    },
    warning: {
      main: '#FFD93D',
      light: '#FFE47D',
      dark: '#CCAE31',
      contrast: '#000000',
    },
    success: {
      main: '#6BCB77',
      light: '#9BDB9F',
      dark: '#55A25E',
      contrast: '#000000',
    },
    background: {
      default: '#001E2B', // Xanh đen biển sâu
      paper: '#002B3D',
      contrast: '#FFFFFF',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B4E0FF',
      disabled: '#4D7A94',
      contrast: '#001E2B',
    },
    divider: '#003347',
    border: '#004D6E',
    shadow: '#00699450',
    action: {
      disabled: '#4D7A94',
      hover: 'rgba(0, 105, 148, 0.1)',
      active: 'rgba(0, 105, 148, 0.2)',
    },
    info: {
      main: '#40E0D0',
      light: '#66E7DB',
      dark: '#33B3A6',
      contrast: '#000000',
    },
  },
}; 