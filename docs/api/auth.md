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
  const user = await AuthService.login("user@example.com", "password123");
  console.log("Đăng nhập thành công:", user);
} catch (error) {
  console.error("Lỗi đăng nhập:", error);
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

## Error Handling

Các mã lỗi phổ biến:

- `auth/invalid-email`: Email không hợp lệ
- `auth/user-disabled`: Tài khoản bị vô hiệu hóa
- `auth/user-not-found`: Không tìm thấy tài khoản
- `auth/wrong-password`: Sai mật khẩu
- `auth/email-already-in-use`: Email đã được sử dụng
