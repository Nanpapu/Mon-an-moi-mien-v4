# Recipe Components

## RecipeCard

Component hiển thị thông tin công thức dạng card.

### Props

```typescript
{
  recipe: Recipe;
  onSave?: (recipe: Recipe) => void;
  onDelete?: (recipe: Recipe) => void;
  showActions?: boolean;
  showReviews?: boolean;
}
```

### Features

- Hiển thị ảnh món ăn
- Thông tin cơ bản: tên, vùng miền
- Nút mở rộng xem chi tiết
- Các action: lưu/xóa công thức
- Hiển thị đánh giá (tùy chọn)

## RecipeCardSkeleton

Component loading placeholder cho RecipeCard.

### Usage

```typescript
<RecipeCardSkeleton />
```

## RecipeList

Component danh sách các công thức.

### Props

```typescript
{
  isRefreshing: boolean;
  isLoading: boolean;
  filteredRecipes: Recipe[];
  savedRecipes: Recipe[];
  onRefresh: () => void;
  onDeleteRecipe: (recipe: Recipe) => void;
}
```

### Features

- Pull to refresh
- Loading state
- Empty state
- Xử lý xóa công thức
