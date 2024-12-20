# Region API

API xử lý thông tin các vùng miền và món ăn đặc trưng.

## RegionService

Service quản lý thông tin vùng miền.

### `getAllRegions(): Promise<Region[]>`

Lấy danh sách tất cả các vùng miền và công thức của chúng.

**Trả về:**
- Promise chứa mảng các Region kèm công thức
- Mảng rỗng nếu có lỗi
- Throw error nếu có lỗi nghiêm trọng

### `getRegionById(regionId: string): Promise<Region | null>`

Lấy thông tin chi tiết một vùng miền và các công thức của nó.

**Tham số:**
- `regionId`: ID của vùng miền

**Trả về:**
- Promise chứa thông tin Region nếu tìm thấy
- null nếu không tìm thấy
- Throw error nếu có lỗi

### `importDataToFirestore(): Promise<boolean>`

Import dữ liệu vùng miền và công thức vào Firestore.

**Trả về:**
- true nếu import thành công
- false nếu có lỗi

### Cache Management

Service tích hợp caching để tối ưu hiệu năng:
- Sử dụng AsyncStorage để lưu cache
- Cache tự động được cập nhật khi có thay đổi
- Thời gian cache: 24 giờ cho vùng miền 