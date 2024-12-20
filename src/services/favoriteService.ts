import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '../types';
import { CacheService, CACHE_KEYS, CACHE_EXPIRY } from './cacheService';

const FAVORITE_RECIPES_KEY = '@favorite_recipes';

export const FavoriteService = {
  // Thêm công thức vào yêu thích
  addFavorite: async (recipe: Recipe): Promise<boolean> => {
    try {
      const favorites = await FavoriteService.getFavorites();
      if (!favorites.find((r) => r.id === recipe.id)) {
        const newFavorites = [...favorites, recipe];
        await AsyncStorage.setItem(
          FAVORITE_RECIPES_KEY,
          JSON.stringify(newFavorites)
        );
        await CacheService.clearCache(CACHE_KEYS.FAVORITE_RECIPES);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Lỗi khi thêm vào yêu thích:', error);
      return false;
    }
  },

  // Xóa công thức khỏi yêu thích
  removeFavorite: async (recipeId: string): Promise<boolean> => {
    try {
      const favorites = await FavoriteService.getFavorites();
      const newFavorites = favorites.filter((r) => r.id !== recipeId);
      await AsyncStorage.setItem(
        FAVORITE_RECIPES_KEY,
        JSON.stringify(newFavorites)
      );
      await CacheService.clearCache(CACHE_KEYS.FAVORITE_RECIPES);
      return true;
    } catch (error) {
      console.error('Lỗi khi xóa khỏi yêu thích:', error);
      return false;
    }
  },

  // Lấy danh sách công thức yêu thích
  getFavorites: async (): Promise<Recipe[]> => {
    try {
      const cached = await CacheService.getCache(
        CACHE_KEYS.FAVORITE_RECIPES,
        CACHE_EXPIRY.FAVORITE_RECIPES
      );
      if (cached) return cached;

      const favoritesStr = await AsyncStorage.getItem(FAVORITE_RECIPES_KEY);
      const favorites = favoritesStr ? JSON.parse(favoritesStr) : [];

      await CacheService.setCache(CACHE_KEYS.FAVORITE_RECIPES, favorites);
      return favorites;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách yêu thích:', error);
      return [];
    }
  },

  // Kiểm tra một công thức có được yêu thích không
  isFavorite: async (recipeId: string): Promise<boolean> => {
    try {
      const favorites = await FavoriteService.getFavorites();
      return favorites.some((r) => r.id === recipeId);
    } catch (error) {
      console.error('Lỗi khi kiểm tra yêu thích:', error);
      return false;
    }
  },
};
