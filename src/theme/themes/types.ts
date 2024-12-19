// Type cho các màu cơ bản
export type ColorPalette = {
  main: string;    
  light: string;   
  dark: string;    
  contrast: string;
};

// Type cho màu nền
export type BackgroundColors = {
  default: string;  
  paper: string;    
  contrast: string;
};

// Type cho màu chữ
export type TextColors = {
  primary: string;   
  secondary: string;
  disabled: string;  
  contrast: string;  
};

// Type cho các action
export type ActionColors = {
  disabled: string;
  hover: string;   
  active: string;  
};

// Type tổng hợp cho tất cả màu sắc
export type ThemeColors = {
  primary: ColorPalette;    
  secondary: ColorPalette;  
  error: ColorPalette;      
  warning: ColorPalette;    
  success: ColorPalette;    
  info: ColorPalette;       
  background: BackgroundColors;
  text: TextColors;
  divider: string;         
  border: string;          
  shadow: string;          
  action: ActionColors;
};

// Type chính cho theme
export type ThemeType = {
  id: string;              
  name: string;            
  icon: string;            
  colors: ThemeColors;     // Thay đổi type này
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