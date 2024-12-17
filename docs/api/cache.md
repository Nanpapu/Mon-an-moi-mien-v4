# Cache API

API xử lý cache dữ liệu trong ứng dụng.

## CacheService

Service quản lý cache dữ liệu sử dụng AsyncStorage.

### `setCache(key: string, data: any): Promise<void>`

Lưu dữ liệu vào cache.

**Tham số:**
- `key`: Key để lưu cache
- `data`: Dữ liệu cần cache

**Lưu ý:**
- Tự động thêm timestamp khi lưu
- Dữ liệu được serialize thành JSON

### `getCache(key: string, expiryTime: number): Promise<any | null>`

Lấy dữ liệu từ cache.

**Tham số:**
- `key`: Key của cache cần lấy
- `expiryTime`: Thời gian hết hạn (milliseconds)

**Trả về:**
- Dữ liệu từ cache nếu còn hạn
- null nếu:
  - Cache không tồn tại
  - Cache đã hết hạn
  - Có lỗi khi đọc cache

### `clearCache(key: string): Promise<void>`

Xóa cache theo key.

**Tham số:**
- `key`: Key của cache cần xóa

## Cache Keys

Các key được sử dụng để lưu cache:

```typescript
CACHE_KEYS = {
  REGIONS: "cached_regions",
  RECIPES: "cached_recipes_",
  SAVED_RECIPES: "cached_saved_recipes_",
  USER_PROFILE: "cached_user_",
  RECIPE_REVIEWS: "cached_reviews_"
}
```

## Cache Expiry Times

Thời gian hết hạn của các loại cache:

```typescript
CACHE_EXPIRY = {
  REGIONS: 24 * 60 * 60 * 1000,      // 24 giờ
  RECIPES: 12 * 60 * 60 * 1000,      // 12 giờ
  SAVED_RECIPES: 6 * 60 * 60 * 1000, // 6 giờ
  USER_PROFILE: 1 * 60 * 60 * 1000,  // 1 giờ
  RECIPE_REVIEWS: 30 * 60 * 1000     // 30 phút
}
```

## Sử dụng Cache

Ví dụ cách sử dụng cache trong services:

```typescript
// Lưu cache
await CacheService.setCache(CACHE_KEYS.REGIONS, regions);

// Đọc cache với thời gian hết hạn
const cachedData = await CacheService.getCache(
  CACHE_KEYS.REGIONS,
  CACHE_EXPIRY.REGIONS
);

// Xóa cache
await CacheService.clearCache(CACHE_KEYS.REGIONS);
``` 