# Search API

API xử lý tìm kiếm trong ứng dụng.

## SearchService

Service quản lý tìm kiếm công thức.

### `searchRecipes(query: string): Promise<Recipe[]>`

Tìm kiếm công thức theo từ khóa.

**Tham số:**
- `query`: Từ khóa tìm kiếm

**Trả về:**
- Promise chứa mảng các Recipe phù hợp
- Mảng rỗng nếu không tìm thấy
- Throw error nếu có lỗi

### `searchByRegion(regionId: string): Promise<Recipe[]>`

Tìm kiếm công thức theo vùng miền.

**Tham số:**
- `regionId`: ID vùng miền

**Trả về:**
- Promise chứa mảng các Recipe của vùng miền
- Mảng rỗng nếu không tìm thấy
- Throw error nếu có lỗi 