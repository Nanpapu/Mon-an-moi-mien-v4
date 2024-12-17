# Review API

API xử lý đánh giá và bình luận cho các công thức.

## ReviewService

Service quản lý đánh giá và bình luận.

### `createReview(recipeId: string, userId: string, rating: number, comment: string): Promise<Review>`

Tạo đánh giá mới cho một công thức.

**Tham số:**
- `recipeId`: ID của công thức
- `userId`: ID của người đánh giá
- `rating`: Số sao đánh giá (1-5)
- `comment`: Nội dung bình luận

**Trả về:**
- Promise chứa thông tin Review mới
- Throw error nếu có lỗi

### `updateReview(reviewId: string, recipeId: string, rating: number, comment: string): Promise<void>`

Cập nhật một đánh giá.

**Tham số:**
- `reviewId`: ID của đánh giá
- `recipeId`: ID của công thức
- `rating`: Số sao đánh giá mới
- `comment`: Nội dung bình luận mới

### `getRecipeReviews(recipeId: string): Promise<Review[]>`

Lấy tất cả đánh giá của một công thức.

**Tham số:**
- `recipeId`: ID của công thức

**Trả về:**
- Promise chứa mảng các Review
- Mảng rỗng nếu không có đánh giá
- Throw error nếu có lỗi

### `getRecipeStats(recipeId: string): Promise<{ averageRating: number, totalReviews: number }>`

Lấy thống kê đánh giá của một công thức.

**Tham số:**
- `recipeId`: ID của công thức

**Trả về:**
- Promise chứa object với:
  - `averageRating`: Điểm đánh giá trung bình
  - `totalReviews`: Tổng số đánh giá
