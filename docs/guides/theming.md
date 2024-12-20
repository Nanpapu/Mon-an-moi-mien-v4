# Hướng dẫn Sử dụng Theme

## Thiết lập Theme

### Theme Provider
```typescript
// src/theme/ThemeContext.tsx
const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;
  
  return (
    <ThemeContext.Provider value={{ theme, isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### Theme Types
```typescript
interface Theme {
  colors: {
    primary: ColorPalette;
    background: {
      default: string;
      paper: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
    divider: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  shadows: {
    sm: ViewStyle;
    md: ViewStyle;
    lg: ViewStyle;
  };
}
```

## Sử dụng Theme

### Trong Components
```typescript
const MyComponent = () => {
  const { theme } = useTheme();
  
  return (
    <View style={{ 
      backgroundColor: theme.colors.background.default,
      padding: theme.spacing.md 
    }}>
      <Typography color="primary">
        Nội dung
      </Typography>
    </View>
  );
};
```

### Typography
```typescript
<Typography 
  variant="h1"
  color="primary"
  align="center"
>
  Tiêu đề
</Typography>
```

### Shadows
```typescript
<View style={[
  styles.card,
  theme.shadows.md
]}>
  {/* Card content */}
</View>
```

### Custom Styles
```typescript
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.paper,
    padding: theme.spacing.md,
    borderRadius: 8,
    ...theme.shadows.sm
  }
});
```
