import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_KEYS = {
  REGIONS: "cached_regions",
  RECIPES: "cached_recipes_",
  SAVED_RECIPES: "cached_saved_recipes_",
  USER_PROFILE: "cached_user_",
  RECIPE_REVIEWS: "cached_reviews_"
};

const CACHE_EXPIRY = {
  REGIONS: 24 * 60 * 60 * 1000, // 24 giờ
  RECIPES: 12 * 60 * 60 * 1000, // 12 giờ
  SAVED_RECIPES: 6 * 60 * 60 * 1000, // 6 giờ
  USER_PROFILE: 1 * 60 * 60 * 1000,  // 1 giờ
  RECIPE_REVIEWS: 30 * 60 * 1000     // 30 phút
};

export const CacheService = {
  // Lưu data với timestamp
  setCache: async (key: string, data: any) => {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
      console.error("Lỗi khi lưu cache:", error);
    }
  },

  // Lấy data và kiểm tra hết hạn
  getCache: async (key: string, expiryTime: number) => {
    try {
      const cached = await AsyncStorage.getItem(key);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();

      if (now - timestamp > expiryTime) {
        // Cache đã hết hạn
        await AsyncStorage.removeItem(key);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Lỗi khi đọc cache:", error);
      return null;
    }
  },

  // Xóa cache
  clearCache: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Lỗi khi xóa cache:", error);
    }
  },
};

export { CACHE_KEYS, CACHE_EXPIRY };
