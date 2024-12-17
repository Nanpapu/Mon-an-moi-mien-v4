# Authentication API

API xử lý xác thực người dùng trong ứng dụng.

## AuthService

Service xử lý các chức năng liên quan đến đăng nhập, đăng ký và quản lý phiên đăng nhập.

### `login(email: string, password: string): Promise<User>`

Đăng nhập người dùng với email và mật khẩu.

**Tham số:**
- `email`: Email của người dùng
- `password`: Mật khẩu của người dùng

**Trả về:**
- Promise chứa thông tin User nếu đăng nhập thành công
- Throw error nếu đăng nhập thất bại

**Ví dụ:**
```typescript
try {
  const user = await AuthService.login('user@example.com', 'password123');
  console.log('Đăng nhập thành công:', user);
} catch (error) {
  console.error('Lỗi đăng nhập:', error);
}
```

### `register(email: string, password: string): Promise<User>`

Đăng ký tài khoản mới.

**Tham số:**
- `email`: Email đăng ký
- `password`: Mật khẩu đăng ký

**Trả về:**
- Promise chứa thông tin User mới nếu đăng ký thành công
- Throw error nếu đăng ký thất bại

### `logout(): Promise<void>`

Đăng xuất người dùng hiện tại.

### `getCurrentUser(): User | null`

Lấy thông tin người dùng đang đăng nhập.

## GoogleAuthService

Service xử lý đăng nhập bằng Google.

### `useGoogleAuth()`

Hook để sử dụng Google Authentication.

**Trả về:**
- Các hàm và state cần thiết cho Google Auth

### `signInWithGoogle(idToken: string): Promise<User>`

Xử lý đăng nhập với Google token.

**Tham số:**
- `idToken`: Token nhận được từ Google

**Trả về:**
- Promise chứa thông tin User nếu đăng nhập thành công
- Throw error nếu đăng nhập thất bại
