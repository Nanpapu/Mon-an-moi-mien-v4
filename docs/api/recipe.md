# Recipe API

API xử lý các chức năng liên quan đến công thức nấu ăn.

## RecipeService

Service quản lý công thức nấu ăn.

### `getRecipeById(recipeId: string): Promise<Recipe | null>`

Lấy thông tin chi tiết một công thức.

**Tham số:**
- `recipeId`: ID của công thức cần lấy

**Trả về:**
- Promise chứa thông tin Recipe nếu tìm thấy
- null nếu không tìm thấy
- Throw error nếu có lỗi

### `getSavedRecipes(userId: string): Promise<Recipe[]>`

Lấy danh sách công thức đã lưu của người dùng.

**Tham số:**
- `userId`: ID của người dùng

**Trả về:**
- Promise chứa mảng các Recipe đã lưu
- Mảng rỗng nếu không có công thức nào
- Throw error nếu có lỗi

### Cache Management

Service tích hợp caching để tối ưu hiệu năng:
- Sử dụng AsyncStorage để lưu cache
- Tự động cập nhật cache khi có thay đổi
- Thời gian cache có thể cấu hình
