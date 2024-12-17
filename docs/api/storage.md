# Storage API

API xử lý lưu trữ file trong ứng dụng.

## StorageService

Service quản lý upload và download file.

### `uploadImage(file: File, path: string): Promise<string>`

Upload ảnh lên storage.

**Tham số:**
- `file`: File ảnh cần upload
- `path`: Đường dẫn lưu trữ

**Trả về:**
- Promise chứa URL download của ảnh
- Throw error nếu upload thất bại

### `deleteImage(url: string): Promise<void>`

Xóa ảnh từ storage.

**Tham số:**
- `url`: URL của ảnh cần xóa

**Trả về:**
- Promise void nếu xóa thành công
- Throw error nếu xóa thất bại 