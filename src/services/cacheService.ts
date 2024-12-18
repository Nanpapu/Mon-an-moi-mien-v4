/**
 * @fileoverview Service xử lý cache dữ liệu trong ứng dụng
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Các key được sử dụng để lưu cache
 * @enum {string}
 */
export const CACHE_KEYS = {
  /** Cache cho danh sách vùng miền */
  REGIONS: 'cached_regions',
  /** Cache cho công thức nấu ăn */
  RECIPES: 'cached_recipes_',
  /** Cache cho công thức đã lưu */
  SAVED_RECIPES: 'cached_saved_recipes_',
  /** Cache cho thông tin người dùng */
  USER_PROFILE: 'cached_user_',
  /** Cache cho đánh giá công thức */
  RECIPE_REVIEWS: 'cached_reviews_',
  /** Cache cho công thức yêu thích */
  FAVORITE_RECIPES: 'cached_favorite_recipes_',
};

/**
 * Thời gian hết hạn của cache (tính bằng milliseconds)
 * @enum {number}
 */
export const CACHE_EXPIRY = {
  /** 24 giờ cho vùng miền */
  REGIONS: 24 * 60 * 60 * 1000,
  /** 12 giờ cho công thức */
  RECIPES: 12 * 60 * 60 * 1000,
  /** 6 giờ cho công thức đã lưu */
  SAVED_RECIPES: 6 * 60 * 60 * 1000,
  /** 1 giờ cho thông tin người dùng */
  USER_PROFILE: 1 * 60 * 60 * 1000,
  /** 30 phút cho đánh giá */
  RECIPE_REVIEWS: 30 * 60 * 1000,
  /** 6 giờ cho công thức yêu thích */
  FAVORITE_RECIPES: 6 * 60 * 60 * 1000,
};

/**
 * Service quản lý cache dữ liệu
 * @module CacheService
 */
export const CacheService = {
  /**
   * Lưu dữ liệu vào cache
   * @param {string} key - Key để lưu cache
   * @param {any} data - Dữ liệu cần cache
   */
  setCache: async (key: string, data: any) => {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Lỗi khi lưu cache:', error);
    }
  },

  /**
   * Lấy dữ liệu từ cache
   * @param {string} key - Key của cache cần lấy
   * @param {number} expiryTime - Thời gian hết hạn của cache
   * @returns {Promise<any | null>} Dữ liệu từ cache hoặc null nếu hết hạn/không tồn tại
   */
  getCache: async (key: string, expiryTime: number) => {
    try {
      const cached = await AsyncStorage.getItem(key);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();

      if (now - timestamp > expiryTime) {
        await AsyncStorage.removeItem(key);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Lỗi khi ��ọc cache:', error);
      return null;
    }
  },

  /**
   * Xóa cache theo key
   * @param {string} key - Key của cache cần xóa
   */
  clearCache: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Lỗi khi xóa cache:', error);
    }
  },
};
