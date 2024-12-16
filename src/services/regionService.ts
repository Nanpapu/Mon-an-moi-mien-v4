import { db } from "../config/firebase";
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
} from "firebase/firestore";
import { Region, Recipe } from "../types";
import { regions } from "../data/regions";
import { COLLECTIONS } from "../constants/collections";
import { CacheService, CACHE_KEYS, CACHE_EXPIRY } from "./cacheService";

export const RegionService = {
  getAllRegions: async (): Promise<Region[]> => {
    try {
      const cachedRegions = await CacheService.getCache(
        CACHE_KEYS.REGIONS,
        CACHE_EXPIRY.REGIONS
      );

      if (cachedRegions) {
        return cachedRegions;
      }

      const regionsSnapshot = await getDocs(
        collection(db, COLLECTIONS.REGIONS)
      );
      const regions: Region[] = [];

      for (const doc of regionsSnapshot.docs) {
        const regionData = doc.data();
        const recipesSnapshot = await getDocs(
          query(
            collection(db, COLLECTIONS.RECIPES),
            where("regionId", "==", doc.id)
          )
        );

        const recipes = recipesSnapshot.docs.map(
          (recipeDoc) => recipeDoc.data() as Recipe
        );

        regions.push({
          id: doc.id, // Thêm id từ document
          ...regionData,
          recipes,
        } as Region);
      }

      await CacheService.setCache(CACHE_KEYS.REGIONS, regions);

      return regions;
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu vùng miền:", error);
      return [];
    }
  },

  getRegionById: async (regionId: string): Promise<Region | null> => {
    try {
      const regionDoc = await getDoc(doc(db, COLLECTIONS.REGIONS, regionId));
      if (!regionDoc.exists()) return null;

      const regionData = regionDoc.data();
      const recipesSnapshot = await getDocs(
        query(
          collection(db, COLLECTIONS.RECIPES),
          where("regionId", "==", regionId)
        )
      );

      const recipes = recipesSnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id, // Thêm id từ document
            ...doc.data(),
          } as Recipe)
      );

      return {
        id: regionDoc.id, // Thêm id từ document
        ...regionData,
        recipes,
      } as Region;
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết vùng miền:", error);
      return null;
    }
  },

  importDataToFirestore: async () => {
    try {
      const batch = writeBatch(db);

      // 1. Lấy danh sách tất cả recipeStats hiện tại
      const statsSnapshot = await getDocs(collection(db, COLLECTIONS.RECIPE_STATS));
      const existingStatsIds = new Set(statsSnapshot.docs.map(doc => doc.id));

      for (const region of regions) {
        const { recipes: regionRecipes, ...regionData } = region;

        // 2. Tạo document cho region
        const regionRef = doc(db, COLLECTIONS.REGIONS, region.id);
        batch.set(regionRef, regionData);

        // 3. Tạo documents cho recipes và recipeStats
        for (const recipe of regionRecipes) {
          // Tạo recipe document
          const recipeRef = doc(db, COLLECTIONS.RECIPES, recipe.id);
          batch.set(recipeRef, {
            ...recipe,
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
              updatedAt: Timestamp.now()
            });
          }
        }
      }

      await batch.commit();
      console.log("Import dữ liệu thành công!");
      return true;
    } catch (error) {
      console.error("Lỗi khi import dữ liệu:", error);
      return false;
    }
  },

  clearRegionsCache: async () => {
    await CacheService.clearCache(CACHE_KEYS.REGIONS);
  },
};
