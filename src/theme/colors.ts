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
  // Giữ nguyên các màu chính để nhất quán
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
  // Màu nền và chữ được điều chỉnh cho theme tối
  background: {
    default: '#1A1B1E', // Màu nền chính - xám đen trung tính
    paper: '#27282B', // Màu nền thành phần - xám đen nhạt hơn
    contrast: '#FFFFFF', // Màu nền tương phản
  },
  text: {
    primary: '#E6E8EC', // Màu chữ chính - trắng xám dịu
    secondary: '#A1A5AC', // Màu chữ phụ - xám nhạt
    disabled: '#696C72', // Màu chữ vô hiệu hóa
    contrast: '#1A1B1E', // Màu chữ tương phản
  },
  divider: '#383A3F', // Màu đường phân cách - xám đậm
  border: '#4A4D52', // Màu viền - xám đậm hơn
  shadow: '#000000', // Màu bóng đổ
  action: {
    disabled: '#696C72', // Màu nút vô hiệu hóa
    hover: 'rgba(255, 255, 255, 0.08)', // Màu khi hover
    active: 'rgba(255, 255, 255, 0.12)', // Màu khi active
  },
  info: {
    main: '#0EA5E9', // Sky blue
    light: '#38BDF8',
    dark: '#0284C7',
    contrast: '#FFFFFF',
  },
};
