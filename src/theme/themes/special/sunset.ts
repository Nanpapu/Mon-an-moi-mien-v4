import { ThemeType } from '../types';

export const sunsetTheme: ThemeType = {
  id: 'sunset-special',
  name: 'Hoàng Hôn',
  icon: 'sunny-outline',
  colors: {
    primary: {
      main: '#FF7E5F', // Cam hoàng hôn
      light: '#FF9F89',
      dark: '#CC654C',
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#FEB47B', // Vàng hoàng hôn
      light: '#FFC89D',
      dark: '#CB9063',
      contrast: '#000000',
    },
    error: {
      main: '#FF5252',
      light: '#FF8080',
      dark: '#CC4242',
      contrast: '#FFFFFF',
    },
    warning: {
      main: '#FFB347',
      light: '#FFC677',
      dark: '#CC8F39',
      contrast: '#000000',
    },
    success: {
      main: '#78C7C7',
      light: '#9DD7D7',
      dark: '#609F9F',
      contrast: '#000000',
    },
    background: {
      default: '#2C1810', // Nâu đỏ đậm
      paper: '#3D2218',
      contrast: '#FFFFFF',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#FFD1C1',
      disabled: '#8F5B4A',
      contrast: '#2C1810',
    },
    divider: '#4D2B1F',
    border: '#5F362A',
    shadow: '#FF7E5F50',
    action: {
      disabled: '#8F5B4A',
      hover: 'rgba(255, 126, 95, 0.1)',
      active: 'rgba(255, 126, 95, 0.2)',
    },
    info: {
      main: '#78C7C7',
      light: '#9DD7D7',
      dark: '#609F9F',
      contrast: '#000000',
    },
  },
};
