# Hướng dẫn Quản lý Đánh giá

## Tạo Đánh giá

```typescript
// Tạo đánh giá mới
await ReviewService.createReview(
  recipeId,
  userId,
  rating,
  comment
);

// Cập nhật đánh giá
await ReviewService.updateReview(
  reviewId,
  recipeId,
  rating,
  comment
);
```

## Hiển thị Đánh giá

### ReviewsList Component
```typescript
<ReviewsList
  recipeId={recipeId}
  reviews={reviews}
  averageRating={averageRating}
  totalReviews={totalReviews}
/>
```

### ReviewModal Component
```typescript
<ReviewModal
  visible={visible}
  recipeId={recipeId}
  userId={userId}
  existingReview={existingReview}
  onClose={handleClose}
  onSubmit={handleSubmit}
/>
```

## Cache Management

```typescript
// Lưu cache đánh giá
await CacheService.setCache(
  `${CACHE_KEYS.RECIPE_REVIEWS}${recipeId}`,
  reviews
);

// Đọc cache đánh giá
const cachedReviews = await CacheService.getCache(
  `${CACHE_KEYS.RECIPE_REVIEWS}${recipeId}`,
  CACHE_EXPIRY.RECIPE_REVIEWS
);
```

## Thống kê Đánh giá

```typescript
// Lấy thống kê đánh giá
const stats = await ReviewService.getRecipeStats(recipeId);
console.log(`Điểm trung bình: ${stats.averageRating}`);
console.log(`Tổng số đánh giá: ${stats.totalReviews}`);
```
