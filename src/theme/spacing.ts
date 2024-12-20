// Định nghĩa các khoảng cách chuẩn trong ứng dụng
export const spacing = {
  xxs: 2,  // Khoảng cách cực nhỏ
  xs: 4,   // Khoảng cách nhỏ
  sm: 8,   // Khoảng cách vừa nhỏ
  md: 16,  // Khoảng cách vừa
  lg: 24,  // Khoảng cách lớn
  xl: 32,  // Khoảng cách rất lớn
  xxl: 48, // Khoảng cách cực lớn
  xxxl: 64,// Khoảng cách đặc biệt lớn
} as const;

// Định nghĩa các khoảng cách layout chuẩn
export const layout = {
  screenPadding: spacing.md,    // Padding cho màn hình
  contentSpacing: spacing.md,   // Khoảng cách giữa các phần tử nội dung
  sectionSpacing: spacing.xl,   // Khoảng cách giữa các section
} as const;
