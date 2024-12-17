# Auth API

API xử lý xác thực người dùng trong ứng dụng.

## AuthService

Service xử lý các chức năng liên quan đến authentication.

### `login(email: string, password: string): Promise<User>`

Đăng nhập người dùng với email và mật khẩu.

**Tham số:**
- `email`: Email đăng nhập
- `password`: Mật khẩu

**Trả về:**
- Promise chứa thông tin User nếu đăng nhập thành công
- Throw error nếu đăng nhập thất bại

### `register(email: string, password: string): Promise<User>`

Đăng ký tài khoản mới.

**Tham số:**
- `email`: Email đăng ký
- `password`: Mật khẩu

**Trả về:**
- Promise chứa thông tin User mới
- Throw error nếu đăng ký thất bại

### `logout(): Promise<void>`

Đăng xuất người dùng hiện tại.

**Trả về:**
- Promise void nếu đăng xuất thành công
- Throw error nếu đăng xuất thất bại

### `resetPassword(email: string): Promise<void>`

Gửi email reset mật khẩu.

**Tham số:**
- `email`: Email cần reset mật khẩu

**Trả về:**
- Promise void nếu gửi email thành công
- Throw error nếu gửi thất bại

### `updateProfile(displayName?: string, photoURL?: string): Promise<void>`

Cập nhật thông tin profile người dùng.

**Tham số:**
- `displayName`: Tên hiển thị mới (optional)
- `photoURL`: URL ảnh đại diện mới (optional)

**Trả về:**
- Promise void nếu cập nhật thành công
- Throw error nếu cập nhật thất bại

### Error Codes

Các mã lỗi authentication phổ biến:
- `INVALID_EMAIL`: Email không hợp lệ
- `USER_DISABLED`: Tài khoản bị vô hiệu hóa
- `USER_NOT_FOUND`: Không tìm thấy tài khoản
- `WRONG_PASSWORD`: Sai mật khẩu
- `EMAIL_IN_USE`: Email đã được sử dụng

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

## AuthContext

Context quản lý trạng thái authentication trong toàn ứng dụng.

### `useAuth()`

Hook để truy cập AuthContext.

**Trả về:**

```typescript
{
  user: User | null; // Người dùng hiện tại
  isLoading: boolean; // Trạng thái loading
  login: Function; // Hàm đăng nhập
  register: Function; // Hàm đăng ký
  logout: Function; // Hàm đăng xuất
  resetPassword: Function; // Hàm reset mật khẩu
  signInWithGoogle: Function; // Hàm đăng nhập với Google
}
```

### `AuthProvider`

Component bọc ứng dụng để cung cấp context.

**Props:**

- `children`: React.ReactNode

**Ví dụ:**

```typescript
function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
```

## Validation

### `useAuthForm()`

Hook xử lý form authentication.

**Trả về:**

```typescript
{
  email: string;
  password: string;
  confirmPassword: string;
  errors: {
    email: string;
    password: string;
    confirmPassword: string;
  }
  validateEmail: (email: string) => boolean;
  validatePassword: (password: string) => boolean;
  validateConfirmPassword: (password: string, confirmPassword: string) =>
    boolean;
}
```
