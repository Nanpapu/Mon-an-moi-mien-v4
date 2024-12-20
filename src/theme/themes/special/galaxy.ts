import { ThemeType } from '../types';

export const galaxyTheme: ThemeType = {
  id: 'galaxy-special',
  name: 'Dải Ngân Hà',
  icon: 'planet-outline',
  colors: {
    primary: {
      main: '#9B4DCA', // Tím galaxy
      light: '#B07DDB',
      dark: '#7B3DA3',
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#4D79CA', // Xanh dương galaxy
      light: '#7D9DDB',
      dark: '#3D60A3',
      contrast: '#FFFFFF',
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
      contrast: '#FFFFFF',
    },
    background: {
      default: '#0B0B1F', // Xanh đen đậm
      paper: '#151531',
      contrast: '#FFFFFF',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B4B4DB',
      disabled: '#6E6E8F',
      contrast: '#0B0B1F',
    },
    divider: '#1F1F3D',
    border: '#2D2D52',
    shadow: '#9B4DCA50',
    action: {
      disabled: '#6E6E8F',
      hover: 'rgba(155, 77, 202, 0.1)',
      active: 'rgba(155, 77, 202, 0.2)',
    },
    info: {
      main: '#4D79CA',
      light: '#7D9DDB',
      dark: '#3D60A3',
      contrast: '#FFFFFF',
    },
  },
};
