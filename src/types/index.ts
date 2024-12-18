/**
 * @fileoverview Định nghĩa các types và interfaces dùng chung trong ứng dụng
 */

import { Timestamp } from 'firebase/firestore';

/**
 * Thông tin cơ bản của một công thức nấu ăn
 * @interface BaseRecipe
 */
export interface BaseRecipe {
  /** ID định danh duy nhất của công thức */
  id: string;
  /** Tên món ăn */
  name: string;
  /** Vùng miền của món ăn */
  region: string;
  /** URL hình ảnh món ăn */
  image: string;
  /** Danh sách nguyên liệu */
  ingredients: string[];
  /** Các bước thực hiện */
  instructions: string[];
}

/**
 * Công thức nấu ăn đầy đủ, kế thừa từ BaseRecipe
 * @interface Recipe
 * @extends {BaseRecipe}
 */
export interface Recipe extends BaseRecipe {
  /** Thời gian nấu (phút) */
  cookingTime?: number;
  /** Độ khó (1-5) */
  difficulty?: number;
  /** Số người ăn */
  servings?: number;
}

/**
 * Thông tin một vùng miền
 * @interface Region
 */
export interface Region {
  /** ID định danh duy nhất của vùng miền */
  id: string;
  /** Tên vùng miền */
  name: string;
  /** Tọa độ địa lý của vùng miền */
  coordinate: {
    /** Vĩ độ */
    latitude: number;
    /** Kinh độ */
    longitude: number;
  };
  /** Danh sách công thức của vùng miền */
  recipes: Recipe[];
}

/**
 * Trạng thái validation của form
 * @interface ValidationState
 */
export interface ValidationState {
  /** Trạng thái hợp lệ của email */
  email: boolean;
  /** Trạng thái hợp lệ của mật khẩu */
  password: boolean;
}

/**
 * Thông tin đánh giá món ăn
 * @interface Review
 */
export interface Review {
  /** ID định danh duy nhất của đánh giá */
  id: string;
  /** ID của công thức được đánh giá */
  recipeId: string;
  /** ID của người đánh giá */
  userId: string;
  /** Số sao đánh giá (1-5) */
  rating: number;
  /** Nội dung bình luận */
  comment: string;
  /** Thời điểm tạo đánh giá */
  createdAt: Timestamp;
  /** Thời điểm cập nhật đánh giá */
  updatedAt: Timestamp;
  /** Thông tin người đánh giá */
  userInfo?: {
    /** Tên hiển thị */
    displayName: string;
    /** Email */
    email: string;
    /** URL ảnh đại diện */
    photoURL?: string;
  };
}

/**
 * Thống kê đánh giá của một công thức
 * @interface RecipeStats
 */
export interface RecipeStats {
  /** ID của công thức */
  recipeId: string;
  /** Điểm đánh giá trung bình */
  averageRating: number;
  /** Tổng số lượt đánh giá */
  totalReviews: number;
  /** Thời điểm tạo */
  createdAt: Timestamp;
  /** Thời điểm cập nhật */
  updatedAt: Timestamp;
}

/**
 * Thông tin người dùng
 * @interface User
 */
export interface User {
  /** ID định danh duy nhất của người dùng */
  uid: string;
  /** Email của người dùng */
  email: string;
  /** Tên hiển thị của người dùng */
  displayName?: string;
  /** URL ảnh đại diện */
  photoURL?: string;
}

/**
 * Thông tin người dùng
 * @interface UserProfile
 */
export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  avatarUpdatedAt?: number;
  createdAt: Date;
  updatedAt?: Date;
}
