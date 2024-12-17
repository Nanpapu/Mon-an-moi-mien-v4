# Favorite API

API xử lý công thức yêu thích của người dùng.

## FavoriteService

Service quản lý công thức yêu thích.

### `addFavorite(userId: string, recipeId: string): Promise<void>`

Thêm công thức vào danh sách yêu thích.

**Tham số:**
- `userId`: ID người dùng
- `recipeId`: ID công thức

**Trả về:**
- Promise void nếu thêm thành công
- Throw error nếu thêm thất bại

### `removeFavorite(userId: string, recipeId: string): Promise<void>`

Xóa công thức khỏi danh sách yêu thích.

**Tham số:**
- `userId`: ID người dùng
- `recipeId`: ID công thức

**Trả về:**
- Promise void nếu xóa thành công
- Throw error nếu xóa thất bại

### `getFavorites(userId: string): Promise<Recipe[]>`

Lấy danh sách công thức yêu thích.

**Tham số:**
- `userId`: ID người dùng

**Trả về:**
- Promise chứa mảng các Recipe yêu thích
- Mảng rỗng nếu không có công thức nào
- Throw error nếu có lỗi

### Cache Management

Service tích hợp caching để tối ưu hiệu năng:
- Sử dụng AsyncStorage để lưu cache
- Cache tự động được cập nhật khi có thay đổi
- Thời gian cache: 6 giờ 