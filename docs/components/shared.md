# Shared Components

## Typography

Component text với các style được định nghĩa sẵn.

### Props
```typescript
{
  variant?: 'h1' | 'h2' | 'h3' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption';
  color?: 'primary' | 'secondary' | 'error';
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}
```

## Button

Component button tùy chỉnh.

### Props
```typescript
{
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error';
  icon?: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
```

## SearchBar

Component thanh tìm kiếm.

### Props
```typescript
{
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}
```

## Loading

Component hiển thị trạng thái loading.

### Props
```typescript
{
  overlay?: boolean;
  text?: string;
}
```
