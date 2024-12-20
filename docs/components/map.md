# Map Components

## MapScreen

Component màn hình chính hiển thị bản đồ.

### Props
- `navigation`: Navigation prop từ React Navigation

### Features
- Hiển thị bản đồ Google Maps
- Markers cho các vùng miền
- Modal hiển thị công thức của vùng
- Nút refresh và random công thức
- Nút view toàn Việt Nam

## MapMarkers

Component hiển thị markers trên bản đồ.

### Props
```typescript
{
  regions: Region[];
  isMapReady: boolean;
  currentZoom: number;
  shouldShowMarker: (marker: Region) => boolean;
  onMarkerPress: (recipes: Recipe[]) => void;
}
```

## MapControls

Component điều khiển bản đồ.

### Props
```typescript
{
  onRefresh: () => void;
  regions: Region[];
  onRandomSelect: () => void;
  onSearch: (query: string) => void;
}
```

## RecipeModal

Modal hiển thị danh sách công thức.

### Props
```typescript
{
  visible: boolean;
  onClose: () => void;
  recipes: Recipe[];
  onSaveRecipe: (recipe: Recipe) => void;
}
```
