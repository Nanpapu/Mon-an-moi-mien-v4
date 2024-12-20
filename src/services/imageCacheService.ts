import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage } from '../config/firebase';
import { getDownloadURL, ref } from 'firebase/storage';

const IMAGE_CACHE_PREFIX = 'image_cache_';
const IMAGE_CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 giờ

export const ImageCacheService = {
  getImageUrl: async (imagePath: string): Promise<string | null> => {
    try {
      // Nếu là URL trực tiếp thì trả về luôn
      if (imagePath.startsWith('http')) {
        return imagePath;
      }

      const cacheKey = `${IMAGE_CACHE_PREFIX}${imagePath}`;
      
      // Kiểm tra cache
      const cached = await AsyncStorage.getItem(cacheKey);
      if (cached) {
        const { url, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < IMAGE_CACHE_EXPIRY) {
          return url;
        }
      }

      // Nếu không có cache hoặc hết hạn, lấy URL mới
      const imageRef = ref(storage, imagePath);
      const url = await getDownloadURL(imageRef);

      // Lưu vào cache
      await AsyncStorage.setItem(cacheKey, JSON.stringify({
        url,
        timestamp: Date.now()
      }));

      return url;
    } catch (error) {
      console.error('Lỗi khi lấy URL hình ảnh:', error);
      return null;
    }
  },

  clearImageCache: async (imagePath: string) => {
    try {
      const cacheKey = `${IMAGE_CACHE_PREFIX}${imagePath}`;
      await AsyncStorage.removeItem(cacheKey);
    } catch (error) {
      console.error('Lỗi khi xóa cache hình ảnh:', error);
    }
  }
};