# Review Components

## ReviewsList

Component hiển thị danh sách đánh giá.

### Props
```typescript
{
  recipeId: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}
```

### Features
- Hiển thị tổng quan đánh giá
- Danh sách các review
- Thông tin người đánh giá
- Số sao và ngày đánh giá

## ReviewModal

Modal tạo/chỉnh sửa đánh giá.

### Props
```typescript
{
  visible: boolean;
  recipeId: string;
  userId: string;
  existingReview?: Review;
  onClose: () => void;
  onSubmit: () => void;
}
```

### Features
- Chọn số sao đánh giá
- Nhập nội dung bình luận
- Cập nhật đánh giá hiện có
- Loading state khi submit
