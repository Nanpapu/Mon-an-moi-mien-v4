# Hướng dẫn Bắt đầu

## Yêu cầu Hệ thống

- Node.js 14.0 trở lên
- npm hoặc yarn
- Expo CLI
- Android Studio hoặc Xcode (để chạy máy ảo)

## Cài đặt

1. Clone repository:

```bash
git clone https://github.com/your-username/mon-an-moi-mien.git
cd mon-an-moi-mien
```

2. Cài đặt dependencies:

```bash
npm install
```

3. Tạo file .env và cấu hình:

```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. Chạy ứng dụng:

```bash
npx expo start
```

## Cấu trúc Dự án

```
src/
├── components/     # Các component tái sử dụng
├── screens/        # Màn hình chính
├── services/       # Logic tương tác với Firebase
├── context/        # React Context
├── hooks/         # Custom hooks
├── theme/         # Cấu hình theme
├── types/         # TypeScript types
├── utils/         # Hàm ti��n ích
└── constants/     # Các hằng số
```

## Firebase Setup

1. Tạo dự án Firebase mới
2. Bật các service:
   - Authentication
   - Firestore
   - Storage
3. Thêm cấu hình vào dự án

## Google Maps Setup

1. Tạo project trong Google Cloud Console
2. Bật Maps SDK cho Android/iOS
3. Tạo API key và thêm vào app.json
