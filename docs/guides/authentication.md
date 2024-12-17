# Hướng dẫn Xác thực

## Thiết lập Firebase Authentication

1. Cấu hình Firebase trong dự án:
```typescript
// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Thông tin cấu hình Firebase
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

2. Thiết lập AuthContext:
```typescript
// src/context/AuthContext.tsx
const AuthProvider = ({ children }) => {
  // Xử lý logic authentication
};
```

## Đăng nhập/Đăng ký

### Email/Password
```typescript
// Đăng nhập
await AuthService.login(email, password);

// Đăng ký
await AuthService.register(email, password);
```

### Google Sign-in
```typescript
const [request, response, promptAsync] = GoogleAuthService.useGoogleAuth();

// Xử lý đăng nhập
if (response?.type === 'success') {
  await GoogleAuthService.signInWithGoogle(response.params.id_token);
}
```

## Quản lý Profile

1. Cập nhật thông tin:
```typescript
await UserService.updateProfile(userId, {
  displayName: 'Tên mới',
  photoURL: 'URL ảnh mới'
});
```

2. Upload avatar:
```typescript
const downloadURL = await UserService.uploadAvatar(userId, imageUri);
```

## Validation

Sử dụng hook useAuthForm để validate form:
```typescript
const {
  email,
  password,
  errors,
  validateEmail,
  validatePassword
} = useAuthForm();
```
