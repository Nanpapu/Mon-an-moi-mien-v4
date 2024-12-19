import { ThemeType } from '../types';

export const retroWaveTheme: ThemeType = {
  id: 'retro-wave-special',
  name: 'RetroWave',
  icon: 'radio-outline',
  colors: {
    primary: {
      main: '#FF2D95', // Hồng neon
      light: '#FF61B3',
      dark: '#CC247A',
      contrast: '#000000',
    },
    secondary: {
      main: '#2DE2E6', // Xanh ngọc neon
      light: '#61E9EC',
      dark: '#24B5B8',
      contrast: '#000000',
    },
    error: {
      main: '#FF3864',
      light: '#FF6B8B',
      dark: '#CC2D50',
      contrast: '#000000',
    },
    warning: {
      main: '#FFB800',
      light: '#FFCC4D',
      dark: '#CC9300',
      contrast: '#000000',
    },
    success: {
      main: '#9D00FF',
      light: '#B84DFF',
      dark: '#7E00CC',
      contrast: '#FFFFFF',
    },
    background: {
      default: '#2B1B41', // Tím đậm
      paper: '#341F4F',
      contrast: '#FF2D95',
    },
    text: {
      primary: '#FF2D95',
      secondary: '#2DE2E6',
      disabled: '#6B4D83',
      contrast: '#000000',
    },
    divider: '#3D2659',
    border: '#4A2E6B',
    shadow: '#FF2D9550',
    action: {
      disabled: '#6B4D83',
      hover: 'rgba(255, 45, 149, 0.1)',
      active: 'rgba(255, 45, 149, 0.2)',
    },
    info: {
      main: '#2DE2E6',
      light: '#61E9EC',
      dark: '#24B5B8',
      contrast: '#000000',
    },
  },
};
