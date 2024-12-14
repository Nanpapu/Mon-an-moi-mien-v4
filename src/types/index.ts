// Định nghĩa các kiểu dữ liệu (types và interfaces) dùng chung trong ứng dụng
import { Timestamp } from 'firebase/firestore';

// Tách thành 2 interface riêng
export interface BaseRecipe {
  id: string;
  name: string;
  region: string;
  image: string;
  ingredients: string[];
  instructions: string[];
}

export interface Recipe {
  id: string;
  name: string;
  region: string;
  image: string;
  ingredients: string[];
  instructions: string[];
}

// Thông tin một vùng miền
export interface Region {
  id: string;           // ID định danh duy nhất
  name: string;         // Tên vùng miền
  coordinate: {         // Tọa độ trên bản đồ
    latitude: number;   // Vĩ độ
    longitude: number;  // Kinh độ
  };
  recipes: Recipe[];    // Danh sách công thức của vùng miền
}

// Trạng thái validation của form
export interface ValidationState {
  email: boolean;       // Trạng thái hợp lệ của email
  password: boolean;    // Trạng thái hợp lệ của mật khẩu
}

// Thêm interface Review
export interface Review {
  id: string;
  recipeId: string; 
  userId: string;
  rating: number;
  comment: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface RecipeStats {
  id: string; // trùng với recipeId
  averageRating: number;
  totalReviews: number;
}

// Thông tin người dùng
export interface User {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
} 