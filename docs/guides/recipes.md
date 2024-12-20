# Hướng dẫn Quản lý Công thức

## Lưu Công thức

### Lưu vào Storage
```typescript
// Lưu công thức mới
const success = await saveRecipe(recipe);

// Lấy danh sách đã lưu
const savedRecipes = await getSavedRecipes();
```

### Cache Management
```typescript
// Lưu cache
await CacheService.setCache(CACHE_KEYS.RECIPES, recipes);

// Đọc cache
const cachedRecipes = await CacheService.getCache(
  CACHE_KEYS.RECIPES,
  CACHE_EXPIRY.RECIPES
);
```

## Tìm kiếm Công thức

### Theo Vùng miền
```typescript
const recipes = regions.find(r => r.id === regionId)?.recipes || [];
```

### Theo từ khóa
```typescript
const filteredRecipes = recipes.filter(recipe => 
  recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
);
```

## Hiển thị Công thức

### RecipeCard
```typescript
<RecipeCard
  recipe={recipe}
  onSave={handleSaveRecipe}
  onDelete={handleDeleteRecipe}
  showReviews={true}
/>
```

### RecipeList
```typescript
<RecipeList
  isRefreshing={isRefreshing}
  isLoading={isLoading}
  filteredRecipes={filteredRecipes}
  savedRecipes={savedRecipes}
  onRefresh={refreshSavedRecipes}
  onDeleteRecipe={handleDeleteRecipe}
/>
```
