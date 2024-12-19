import { lightColors } from './colors';

// Theme sáng mặc định
export const lightTheme = {
  id: 'light',
  name: 'Chế độ sáng',
  icon: 'sunny-outline',
  colors: lightColors,
};

// Theme sáng với tông xanh dương
export const blueLightTheme = {
  id: 'blue-light',
  name: 'Sáng xanh dương',
  icon: 'water-outline',
  colors: {
    primary: {
      main: '#2563EB', // Xanh dương đậm
      light: '#60A5FA', // Xanh dương nhạt
      dark: '#1D4ED8', // Xanh dương tối
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#64748B',
      light: '#94A3B8',
      dark: '#475569',
      contrast: '#FFFFFF',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
      contrast: '#FFFFFF',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
      contrast: '#000000',
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
      contrast: '#FFFFFF',
    },
    background: {
      default: '#F0F9FF', // Nền xanh dương rất nhạt
      paper: '#FFFFFF',
      contrast: '#0C4A6E',
    },
    text: {
      primary: '#0F172A',
      secondary: '#475569',
      disabled: '#94A3B8',
      contrast: '#FFFFFF',
    },
    divider: '#E2E8F0',
    border: '#CBD5E1',
    shadow: '#000000',
    action: {
      disabled: '#94A3B8',
      hover: 'rgba(37, 99, 235, 0.04)',
      active: 'rgba(37, 99, 235, 0.08)',
    },
    info: {
      main: '#0EA5E9',
      light: '#38BDF8',
      dark: '#0284C7',
      contrast: '#FFFFFF',
    },
  },
};

// Theme sáng với tông xanh lá
export const greenLightTheme = {
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

// Theme tối cổ điển (theme cũ của bạn)
export const classicDarkTheme = {
  id: 'classic-dark',
  name: 'Tối cổ điển',
  icon: 'moon-outline',
  colors: {
    primary: {
      main: '#60A5FA',
      light: '#93C5FD',
      dark: '#2563EB',
      contrast: '#000000',
    },
    secondary: {
      main: '#94A3B8',
      light: '#CBD5E1',
      dark: '#64748B',
      contrast: '#000000',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
      contrast: '#000000',
    },
    warning: {
      main: '#FBBF24',
      light: '#FCD34D',
      dark: '#F59E0B',
      contrast: '#000000',
    },
    success: {
      main: '#34D399',
      light: '#6EE7B7',
      dark: '#10B981',
      contrast: '#000000',
    },
    background: {
      default: '#1A1B1E',
      paper: '#27282B',
      contrast: '#FFFFFF',
    },
    text: {
      primary: '#E6E8EC',
      secondary: '#A1A5AC',
      disabled: '#696C72',
      contrast: '#1A1B1E',
    },
    divider: '#383A3F',
    border: '#4A4D52',
    shadow: '#000000',
    action: {
      disabled: '#696C72',
      hover: 'rgba(255, 255, 255, 0.08)',
      active: 'rgba(255, 255, 255, 0.12)',
    },
    info: {
      main: '#0EA5E9',
      light: '#38BDF8',
      dark: '#0284C7',
      contrast: '#FFFFFF',
    },
  },
};

// Theme tối với tông tím
export const purpleDarkTheme = {
  id: 'purple-dark',
  name: 'Tối tím',
  icon: 'color-palette-outline',
  colors: {
    primary: {
      main: '#7C3AED',
      light: '#A78BFA',
      dark: '#5B21B6',
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#6B7280',
      light: '#9CA3AF',
      dark: '#4B5563',
      contrast: '#FFFFFF',
    },
    error: {
      main: '#EF4444',
      light: '#FCA5A5',
      dark: '#B91C1C',
      contrast: '#FFFFFF',
    },
    warning: {
      main: '#F59E0B',
      light: '#FCD34D',
      dark: '#B45309',
      contrast: '#000000',
    },
    success: {
      main: '#22C55E',
      light: '#86EFAC',
      dark: '#15803D',
      contrast: '#FFFFFF',
    },
    background: {
      default: '#18181B',
      paper: '#27272A',
      contrast: '#FFFFFF',
    },
    text: {
      primary: '#FAFAFA',
      secondary: '#A1A1AA',
      disabled: '#52525B',
      contrast: '#18181B',
    },
    divider: '#3F3F46',
    border: '#52525B',
    shadow: '#000000',
    action: {
      disabled: '#52525B',
      hover: 'rgba(255, 255, 255, 0.05)',
      active: 'rgba(255, 255, 255, 0.08)',
    },
    info: {
      main: '#06B6D4',
      light: '#67E8F9',
      dark: '#0891B2',
      contrast: '#FFFFFF',
    },
  },
};

// Theme tối trung tính
export const neutralDarkTheme = {
  id: 'neutral-dark',
  name: 'Tối trung tính',
  icon: 'contrast-outline',
  colors: {
    primary: {
      main: '#60A5FA',
      light: '#93C5FD',
      dark: '#2563EB',
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#94A3B8',
      light: '#CBD5E1',
      dark: '#64748B',
      contrast: '#FFFFFF',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
      contrast: '#FFFFFF',
    },
    warning: {
      main: '#FBBF24',
      light: '#FCD34D',
      dark: '#F59E0B',
      contrast: '#000000',
    },
    success: {
      main: '#34D399',
      light: '#6EE7B7',
      dark: '#10B981',
      contrast: '#FFFFFF',
    },
    background: {
      default: '#0F172A',
      paper: '#1E293B',
      contrast: '#F8FAFC',
    },
    text: {
      primary: '#E2E8F0',
      secondary: '#94A3B8',
      disabled: '#475569',
      contrast: '#0F172A',
    },
    divider: '#334155',
    border: '#475569',
    shadow: '#000000',
    action: {
      disabled: '#475569',
      hover: 'rgba(255, 255, 255, 0.05)',
      active: 'rgba(255, 255, 255, 0.08)',
    },
    info: {
      main: '#0EA5E9',
      light: '#38BDF8',
      dark: '#0284C7',
      contrast: '#FFFFFF',
    },
  },
};

// Danh sách tất cả các theme
export const themes = [
  lightTheme,
  blueLightTheme,
  greenLightTheme,
  classicDarkTheme,
  purpleDarkTheme,
  neutralDarkTheme,
];

// Type cho theme
export type ThemeType = {
  id: string;
  name: string;
  icon: string;
  colors: typeof lightColors;
};