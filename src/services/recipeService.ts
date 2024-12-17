/**
 * @fileoverview Service xử lý các chức năng liên quan đến công thức nấu ăn
 */

import { CacheService, CACHE_KEYS, CACHE_EXPIRY } from './cacheService';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { COLLECTIONS } from '../constants/collections';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Service quản lý công thức nấu ăn
 * @module RecipeService
 */
export const RecipeService = {
  /**
   * Lấy thông tin chi tiết một công thức
   * @param {string} recipeId - ID của công thức cần lấy
   * @returns {Promise<object | null>} Thông tin công thức hoặc null nếu không tìm thấy
   * @throws {Error} Lỗi khi lấy thông tin công thức
   */
  getRecipeById: async (recipeId: string) => {
    try {
      const cacheKey = `${CACHE_KEYS.RECIPES}${recipeId}`;
      
      // Lấy recipe và stats
      const recipeDoc = await getDoc(doc(db, COLLECTIONS.RECIPES, recipeId));
      const statsDoc = await getDoc(doc(db, COLLECTIONS.RECIPE_STATS, recipeId));

      if (!recipeDoc.exists()) return null;

      const recipe = { 
        id: recipeDoc.id, 
        ...recipeDoc.data(),
        rating: statsDoc.exists() ? statsDoc.data().averageRating : 0,
        totalReviews: statsDoc.exists() ? statsDoc.data().totalReviews : 0
      };
      
      // Luôn cập nhật cache mới nhất
      await CacheService.setCache(cacheKey, recipe);
      return recipe;
    } catch (error) {
      console.error('Lỗi khi lấy công thức:', error);
      throw error;
    }
  },

  /**
   * Lấy danh sách công thức đã lưu của người dùng
   * @param {string} userId - ID của người dùng
   * @returns {Promise<Array>} Danh sách công thức đã lưu
   */
  getSavedRecipes: async (userId: string) => {
    try {
      const cacheKey = `${CACHE_KEYS.SAVED_RECIPES}${userId}`;
      const cachedRecipes = await CacheService.getCache(
        cacheKey,
        CACHE_EXPIRY.SAVED_RECIPES
      );

      if (cachedRecipes) {
        return cachedRecipes;
      }

      const savedRecipes = await AsyncStorage.getItem(`saved_recipes_${userId}`);
      if (savedRecipes) {
        const recipes = JSON.parse(savedRecipes);
        await CacheService.setCache(cacheKey, recipes);
        return recipes;
      }

      return [];
    } catch (error) {
      console.error('Lỗi khi lấy công thức đã lưu:', error);
      return [];
    }
  },

  clearRecipeCache: async (recipeId: string) => {
    await CacheService.clearCache(`${CACHE_KEYS.RECIPES}${recipeId}`);
  },

  clearSavedRecipesCache: async (userId: string) => {
    await CacheService.clearCache(`${CACHE_KEYS.SAVED_RECIPES}${userId}`);
  }
}; 