// Export tất cả các theme và types
export * from './types';
export * from './light';
export * from './blueLight';
export * from './greenLight';
export * from './classicDark';
export * from './purpleDark';
export * from './neutralDark';

// Import các theme
import { lightTheme } from './light';
import { blueLightTheme } from './blueLight';
import { greenLightTheme } from './greenLight';
import { classicDarkTheme } from './classicDark';
import { purpleDarkTheme } from './purpleDark';
import { neutralDarkTheme } from './neutralDark';

// Export danh sách theme
export const themes = [
  lightTheme,
  blueLightTheme,
  greenLightTheme,
  classicDarkTheme,
  purpleDarkTheme,
  neutralDarkTheme,
];
