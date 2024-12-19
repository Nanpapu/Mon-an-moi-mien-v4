import { lightColors } from '../colors';

// Type cho các màu cơ bản
export type ColorPalette = {
  main: string;    // Màu chính
  light: string;   // Màu nhạt
  dark: string;    // Màu đậm
  contrast: string; // Màu tương phản
};

// Type cho màu nền
export type BackgroundColors = {
  default: string;  // Màu nền mặc định
  paper: string;    // Màu nền cho các thành phần nổi
  contrast: string; // Màu nền tương phản
};

// Type cho màu chữ
export type TextColors = {
  primary: string;   // Màu chữ chính
  secondary: string; // Màu chữ phụ
  disabled: string;  // Màu chữ bị vô hiệu hóa
  contrast: string;  // Màu chữ tương phản
};

// Type cho các action
export type ActionColors = {
  disabled: string; // Màu khi bị vô hiệu hóa
  hover: string;    // Màu khi hover
  active: string;   // Màu khi active
};

// Type tổng hợp cho tất cả màu sắc
export type ThemeColors = {
  primary: ColorPalette;    // Màu chủ đạo
  secondary: ColorPalette;  // Màu phụ
  error: ColorPalette;      // Màu lỗi
  warning: ColorPalette;    // Màu cảnh báo
  success: ColorPalette;    // Màu thành công
  info: ColorPalette;       // Màu thông tin
  background: BackgroundColors;
  text: TextColors;
  divider: string;         // Màu đường phân cách
  border: string;          // Màu viền
  shadow: string;          // Màu bóng đổ
  action: ActionColors;
};

// Type chính cho theme
export type ThemeType = {
  id: string;              // ID định danh theme
  name: string;            // Tên hiển thị của theme
  icon: string;            // Icon đại diện cho theme
  colors: typeof lightColors; // Bảng màu của theme
};

// Type cho theme context
export type ThemeContextType = {
  currentTheme: ThemeType;              // Theme hiện tại
  setTheme: (themeId: string) => void;  // Hàm thay đổi theme
  availableThemes: ThemeType[];         // Danh sách theme có sẵn
  defaultLightTheme: string;            // Theme sáng mặc định
  defaultDarkTheme: string;             // Theme tối mặc định
  setDefaultTheme: (themeId: string) => void; // Hàm đặt theme mặc định
  toggleTheme: () => void;              // Hàm chuyển đổi giữa sáng/tối
}; 