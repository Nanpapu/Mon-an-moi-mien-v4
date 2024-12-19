/**
 * @fileoverview Service xử lý thông tin các vùng miền và món ăn đặc trưng
 */

import { db } from '../config/firebase';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  addDoc,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';
import { Region, Recipe } from '../types';
import { regions } from '../data/regions';
import { COLLECTIONS } from '../constants/collections';
import { CacheService, CACHE_KEYS, CACHE_EXPIRY } from './cacheService';
import { ImageUtils } from '../utils/imageUtils';
import { ref, uploadBytes, deleteObject, listAll } from 'firebase/storage';
import { storage } from '../config/firebase';

/**
 * Service quản lý thông tin vùng miền
 * @module RegionService
 */
export const RegionService = {
  /**
   * Lấy danh sách tất cả các vùng miền và công thức của chúng
   * @returns {Promise<Region[]>} Danh sách vùng miền kèm công thức
   * @throws {Error} Lỗi khi lấy dữ liệu vùng miền
   */
  getAllRegions: async (): Promise<Region[]> => {
    try {
      const cachedRegions = await CacheService.getCache(
        CACHE_KEYS.REGIONS,
        CACHE_EXPIRY.REGIONS
      );

      if (cachedRegions) {
        console.log('Returning cached regions:', cachedRegions.length);
        return cachedRegions;
      }

      const regionsSnapshot = await getDocs(
        collection(db, COLLECTIONS.REGIONS)
      );
      console.log('Total regions in Firestore:', regionsSnapshot.size);

      const regions: Region[] = [];

      for (const doc of regionsSnapshot.docs) {
        const regionData = doc.data();
        console.log('Processing region:', doc.id);
        
        const recipesSnapshot = await getDocs(
          query(
            collection(db, COLLECTIONS.RECIPES),
            where('regionId', '==', doc.id)
          )
        );

        const recipes = recipesSnapshot.docs.map(
          (recipeDoc) => recipeDoc.data() as Recipe
        );

        regions.push({
          id: doc.id,
          ...regionData,
          recipes,
        } as Region);
      }

      console.log('Total processed regions:', regions.length);
      await CacheService.setCache(CACHE_KEYS.REGIONS, regions);

      return regions;
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu vùng miền:', error);
      return [];
    }
  },

  /**
   * Lấy thông tin chi tiết một vùng miền và các công thức của nó
   * @param {string} regionId - ID của vùng miền
   * @returns {Promise<Region | null>} Thông tin vùng miền hoặc null nếu không tìm thấy
   */
  getRegionById: async (regionId: string): Promise<Region | null> => {
    try {
      const regionDoc = await getDoc(doc(db, COLLECTIONS.REGIONS, regionId));
      if (!regionDoc.exists()) return null;

      const regionData = regionDoc.data();
      const recipesSnapshot = await getDocs(
        query(
          collection(db, COLLECTIONS.RECIPES),
          where('regionId', '==', regionId)
        )
      );

      const recipes = recipesSnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id, // Thêm id từ document
            ...doc.data(),
          }) as Recipe
      );

      return {
        id: regionDoc.id, // Thêm id từ document
        ...regionData,
        recipes,
      } as Region;
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết vùng miền:', error);
      return null;
    }
  },

  /**
   * Import dữ liệu vùng miền và công thức vào Firestore
   * @returns {Promise<boolean>} true nếu import thành công
   */
  importDataToFirestore: async () => {
    try {
      const batch = writeBatch(db);

      // 1. Xóa tất cả ảnh cũ trong storage
      const storageRef = ref(storage, 'recipes/images');
      console.log('Checking storage path:', storageRef.fullPath);
      const oldFiles = await listAll(storageRef);
      const deletePromises = oldFiles.items.map(item => deleteObject(item));
      await Promise.all(deletePromises);

      // 2. Lấy danh sách tất cả recipeStats hiện tại
      const statsSnapshot = await getDocs(
        collection(db, COLLECTIONS.RECIPE_STATS)
      );
      const existingStatsIds = new Set(statsSnapshot.docs.map((doc) => doc.id));

      for (const region of regions) {
        const { recipes: regionRecipes, ...regionData } = region;

        // 3. Tạo document cho region
        const regionRef = doc(db, COLLECTIONS.REGIONS, region.id);
        batch.set(regionRef, regionData);

        // 4. Tạo documents cho recipes và recipeStats
        for (const recipe of regionRecipes) {
          // Tạo đường dẫn tương đối cho ảnh
          const imagePath = `recipes/images/${region.id}/${recipe.id}.jpg`;

          // Upload ảnh lên storage nếu có URL
          if (recipe.image && recipe.image.startsWith('http')) {
            try {
              const response = await fetch(recipe.image);
              const blob = await response.blob();
              const imageRef = ref(storage, imagePath);
              console.log('Uploading image to:', imagePath);
              await uploadBytes(imageRef, blob);
              console.log('Upload success for:', recipe.id);
            } catch (error) {
              console.error(`Lỗi khi upload ảnh cho recipe ${recipe.id}:`, error);
            }
          }

          // Tạo recipe document với đường dẫn ảnh mới
          const recipeRef = doc(db, COLLECTIONS.RECIPES, recipe.id);
          batch.set(recipeRef, {
            ...recipe,
            image: imagePath,  // Lưu đường dẫn tương đối
            regionId: region.id,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
          });

          // Chỉ tạo recipeStats mới nếu chưa tồn tại
          if (!existingStatsIds.has(recipe.id)) {
            const recipeStatsRef = doc(db, COLLECTIONS.RECIPE_STATS, recipe.id);
            batch.set(recipeStatsRef, {
              recipeId: recipe.id,
              averageRating: 0,
              totalReviews: 0,
              createdAt: Timestamp.now(),
              updatedAt: Timestamp.now(),
            });
          }
        }
      }

      await batch.commit();
      console.log('Import dữ liệu thành công!');
      return true;
    } catch (error) {
      console.error('Lỗi khi import data:', error);
      throw error;
    }
  },

  /**
   * Xóa cache của vùng miền
   */
  clearRegionsCache: async () => {
    await CacheService.clearCache(CACHE_KEYS.REGIONS);
  },

  /**
   * Debug Regions Data
   */
  debugRegionsData: async () => {
    try {
      const regionsSnapshot = await getDocs(collection(db, COLLECTIONS.REGIONS));
      console.log('Total regions in Firestore:', regionsSnapshot.size);
      
      regionsSnapshot.forEach(doc => {
        console.log('Region:', {
          id: doc.id,
          ...doc.data()
        });
      });
    } catch (error) {
      console.error('Debug error:', error);
    }
  }
};
