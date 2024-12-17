# Món Ăn Mọi Miền v2

Ứng dụng di động giúp khám phá các món ăn đặc trưng của từng vùng miền Việt Nam, được xây dựng bằng React Native và Expo.

## 📱 Tính năng chính

- 🗺️ Bản đồ tương tác hiển thị món ăn theo vùng miền
- 📖 Công thức nấu ăn chi tiết với nguyên liệu và hướng dẫn
- ⭐ Hệ thống đánh giá và bình luận
- 💾 Lưu trữ công thức yêu thích
- 🌙 Hỗ trợ Dark mode
- 🔍 Tìm kiếm và lọc công thức

## 🚀 Cài đặt

1. Clone repository:
   ```bash
   git clone https://github.com/your-username/mon-an-moi-mien.git
   ```

2.Di chuyển vào thư mục dự án
    ```bash
    cd mon-an-moi-mien
    ```

3.Cài đặt các dependencies
    ```bash
    npm install
    ```

4.Chạy ứng dụng
    ```bash
    npx expo start
    ```

## 🛠️ Công nghệ sử dụng

- React Native với Expo
- TypeScript
- Firebase (Authentication, Firestore, Storage)
- React Navigation
- Expo Location & Maps
- AsyncStorage cho caching

## 📁 Cấu trúc thư mục
```
src/
├── components/     # Các component tái sử dụng
├── screens/        # Màn hình chính của ứng dụng  
├── services/       # Logic tương tác với Firebase
├── context/        # React Context cho state management
├── hooks/          # Custom hooks
├── theme/          # Cấu hình theme và styles
├── types/          # TypeScript types và interfaces
├── utils/          # Các hàm tiện ích
└── constants/      # Các hằng số
```

## 📖 Tài liệu

- [Hướng dẫn bắt đầu](docs/guides/getting-started.md)
- [API Reference](docs/api/)
- [Components](docs/components/)

## 📄 License

MIT License - xem [LICENSE](LICENSE) để biết thêm chi tiết.