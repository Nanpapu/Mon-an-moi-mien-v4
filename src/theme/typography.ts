import { Platform } from 'react-native';

// Định nghĩa các kiểu chữ chuẩn cho ứng dụng
export const typography = {
  // Tiêu đề lớn nhất
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
    letterSpacing: 0.25,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  // Tiêu đề cấp 2
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
    letterSpacing: 0,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  // Tiêu đề cấp 3
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
    letterSpacing: 0.15,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  // Phụ đề lớn
  subtitle1: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
    letterSpacing: 0.15,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  // Phụ đề nhỏ
  subtitle2: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
    letterSpacing: 0.1,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  // Văn bản chính
  body1: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  // Văn bản phụ
  body2: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
    letterSpacing: 0.25,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  // Kiểu chữ cho nút
  button: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
    letterSpacing: 1.25,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    textTransform: 'uppercase' as const,
  },
  // Chữ chú thích
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
    letterSpacing: 0.4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  // Chữ trên đầu
  overline: {
    fontSize: 10,
    fontWeight: '400' as const,
    lineHeight: 16,
    letterSpacing: 1.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    textTransform: 'uppercase' as const,
  },
};
