// Định nghĩa màu sắc cho theme sáng
export const lightColors = {
  primary: {
    main: '#007AFF', // Màu chính của ứng dụng
    light: '#4DA3FF', // Màu chính nhạt hơn
    dark: '#0055B3', // Màu chính tối hơn
    contrast: '#FFFFFF', // Màu chữ tương phản trên nền primary
  },
  secondary: {
    main: '#64748B', // Màu phụ của ứng dụng
    light: '#94A3B8', // Màu phụ nhạt hơn
    dark: '#475569', // Màu phụ tối hơn
    contrast: '#FFFFFF', // Màu chữ tương phản trên nền secondary
  },
  error: {
    main: '#DC2626', // Màu thông báo lỗi
    light: '#EF4444', // Màu lỗi nhạt hơn
    dark: '#B91C1C', // Màu lỗi tối hơn
    contrast: '#FFFFFF', // Màu chữ tương phản trên nền error
  },
  warning: {
    main: '#F59E0B', // Màu cảnh báo
    light: '#FBBF24', // Màu cảnh báo nhạt hơn
    dark: '#D97706', // Màu cảnh báo tối hơn
    contrast: '#000000', // Màu chữ tương phản trên nền warning
  },
  success: {
    main: '#10B981', // Màu thành công
    light: '#34D399', // Màu thành công nhạt hơn
    dark: '#059669', // Màu thành công tối hơn
    contrast: '#FFFFFF', // Màu chữ tương phản trên nền success
  },
  background: {
    default: '#FFFFFF', // Màu nền mặc định
    paper: '#F8FAFC', // Màu nền cho các thành phần nổi (card, modal...)
    contrast: '#1E293B', // Màu nền tương phản
  },
  text: {
    primary: '#1E293B', // Màu chữ chính
    secondary: '#64748B', // Màu chữ phụ
    disabled: '#94A3B8', // Màu chữ bị vô hiệu hóa
    contrast: '#FFFFFF', // Màu chữ tương phản
  },
  divider: '#E2E8F0', // Màu đường phân cách
  border: '#CBD5E1', // Màu viền
  shadow: '#000000', // Màu bóng đổ
  action: {
    disabled: '#94A3B8', // Màu nút bị vô hiệu hóa
    hover: 'rgba(0, 0, 0, 0.04)', // Màu khi hover
    active: 'rgba(0, 0, 0, 0.08)', // Màu khi active
  },
  info: {
    main: '#0EA5E9', // Sky blue
    light: '#38BDF8',
    dark: '#0284C7',
    contrast: '#FFFFFF',
  },
};

// Định nghĩa màu sắc cho theme tối
export const darkColors = {
  primary: {
    main: '#3B82F6',     // Xanh dương nhạt hơn
    light: '#60A5FA',    // Xanh dương sáng
    dark: '#1D4ED8',     // Xanh dương đậm
    contrast: '#FFFFFF',  // Chữ trắng trên nền primary
  },
  secondary: {
    main: '#64748B',     // Xám trung tính
    light: '#94A3B8',    // Xám nhạt
    dark: '#475569',     // Xám đậm
    contrast: '#FFFFFF',  // Chữ trắng trên nền secondary
  },
  error: {
    main: '#DC2626',     // Đỏ lỗi
    light: '#EF4444',    // Đỏ nhạt
    dark: '#B91C1C',     // Đỏ đậm
    contrast: '#FFFFFF',  // Chữ trắng trên nền error
  },
  warning: {
    main: '#D97706',     // Cam cảnh báo
    light: '#F59E0B',    // Cam nhạt
    dark: '#B45309',     // Cam đậm
    contrast: '#FFFFFF',  // Chữ trắng trên nền warning
  },
  success: {
    main: '#059669',     // Xanh lá thành công
    light: '#10B981',    // Xanh lá nhạt
    dark: '#047857',     // Xanh lá đậm
    contrast: '#FFFFFF',  // Chữ trắng trên nền success
  },
  background: {
    default: '#0F172A',  // Nền chính - xanh đen đậm
    paper: '#1E293B',    // Nền thành phần - xanh đen nhạt hơn
    contrast: '#F8FAFC', // Nền tương phản - gần như trắng
  },
  text: {
    primary: '#E2E8F0',   // Chữ chính - xám trắng dịu
    secondary: '#94A3B8', // Chữ phụ - xám nhạt
    disabled: '#475569',  // Chữ vô hiệu - xám đậm
    contrast: '#0F172A',  // Chữ tương phản - xanh đen đậm
  },
  divider: '#334155',    // Đường phân cách - xanh đen nhạt
  border: '#475569',     // Viền - xám đậm
  shadow: '#000000',     // Bóng đổ - đen
  action: {
    disabled: '#475569', // Nút vô hiệu - xám đậm
    hover: 'rgba(255, 255, 255, 0.05)',  // Hover nhẹ hơn
    active: 'rgba(255, 255, 255, 0.08)', // Active nhẹ hơn
  },
  info: {
    main: '#0EA5E9',     // Xanh dương thông tin
    light: '#38BDF8',    // Xanh dương nhạt
    dark: '#0284C7',     // Xanh dương đậm
    contrast: '#FFFFFF',  // Chữ trắng trên nền info
  },
};
