# User API

API xử lý thông tin và quản lý người dùng.

## UserService

Service quản lý thông tin người dùng.

### `updateProfile(userId: string, data: { displayName?: string, photoURL?: string }): Promise<boolean>`

Cập nhật thông tin profile người dùng.

**Tham số:**

- `userId`: ID của người dùng
- `data`: Object chứa thông tin cần cập nhật
  - `displayName`: Tên hiển thị (optional)
  - `photoURL`: URL ảnh đại diện (optional)

**Trả về:**

- Promise<boolean> - true nếu cập nhật thành công
- Throw error nếu cập nhật thất bại

### `uploadAvatar(userId: string, imageUri: string): Promise<string | null>`

Upload ảnh đại diện mới.

**Tham số:**

- `userId`: ID của người dùng
- `imageUri`: URI của ảnh cần upload

**Trả về:**

- Promise chứa URL download của ảnh nếu thành công
- null nếu upload thất bại
- Throw error nếu có lỗi

### `createUserDocument(userId: string, email: string): Promise<boolean>`

Tạo document người dùng trong Firestore.

**Tham số:**

- `userId`: ID của người dùng
- `email`: Email của người dùng

**Trả về:**

- Promise<boolean> - true nếu tạo thành công
- Throw error nếu tạo thất bại

### `getUserInfo(userId: string): Promise<UserInfo | null>`

Lấy thông tin người dùng.

**Tham số:**

- `userId`: ID của người dùng

**Trả về:**

- Promise chứa object UserInfo nếu tìm thấy:
  ```typescript
  {
    displayName: string;
    email: string;
    photoURL?: string;
  }
  ```
- null nếu không tìm thấy
- Throw error nếu có lỗi

### Xử lý Cache

- Thông tin người dùng được cache trong AsyncStorage
- Cache tự động refresh khi có thay đổi
- Thời gian cache: 1 giờ
