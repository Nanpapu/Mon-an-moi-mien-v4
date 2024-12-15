import { db } from '../config/firebase';
import { collection, getDocs, doc, getDoc, query, where, setDoc, addDoc, Timestamp, writeBatch } from 'firebase/firestore';
import { Region, Recipe } from '../types';
import { regions } from '../data/regions';

export const RegionService = {
  // Lấy tất cả vùng miền
  getAllRegions: async (): Promise<Region[]> => {
    try {
      const regionsSnapshot = await getDocs(collection(db, 'regions'));
      const regions: Region[] = [];
      
      for (const doc of regionsSnapshot.docs) {
        const regionData = doc.data();
        const recipesSnapshot = await getDocs(
          query(collection(db, 'recipes'), where('regionId', '==', doc.id))
        );
        
        const recipes = recipesSnapshot.docs.map(recipeDoc => recipeDoc.data() as Recipe);
        
        regions.push({
          ...regionData,
          recipes
        } as Region);
      }
      
      return regions;
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu vùng miền:', error);
      return [];
    }
  },

  // Lấy chi tiết một vùng miền 
  getRegionById: async (regionId: string): Promise<Region | null> => {
    try {
      const regionDoc = await getDoc(doc(db, 'regions', regionId));
      if (!regionDoc.exists()) return null;

      const regionData = regionDoc.data();
      const recipesSnapshot = await getDocs(
        query(collection(db, 'recipes'), where('regionId', '==', regionId))
      );
      
      const recipes = recipesSnapshot.docs.map(doc => doc.data() as Recipe);
      
      return {
        ...regionData,
        recipes
      } as Region;
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết vùng miền:', error);
      return null;
    }
  },

  importDataToFirestore: async () => {
    try {
      const batch = writeBatch(db);

      // 1. Import regions và recipes
      for (const region of regions) {
        const { recipes: regionRecipes, ...regionData } = region;
        
        // Import region
        const regionRef = doc(db, 'regions', region.id);
        batch.set(regionRef, regionData);
        
        // Import recipes
        for (const recipe of regionRecipes) {
          const recipeRef = doc(db, 'recipes', recipe.id);
          batch.set(recipeRef, {
            ...recipe,
            regionId: region.id
          });
        }
      }

      // 2. Commit batch write đầu tiên
      await batch.commit();

      // 3. Tính toán lại stats từ reviews hiện có
      const reviewsSnapshot = await getDocs(collection(db, 'reviews'));
      const recipeStatsMap = new Map();

      reviewsSnapshot.docs.forEach(doc => {
        const review = doc.data();
        const stats = recipeStatsMap.get(review.recipeId) || {
          totalReviews: 0,
          totalRating: 0
        };
        
        stats.totalReviews++;
        stats.totalRating += review.rating;
        recipeStatsMap.set(review.recipeId, stats);
      });

      // 4. Update recipeStats
      const statsUpdateBatch = writeBatch(db);
      for (const [recipeId, stats] of recipeStatsMap) {
        const statRef = doc(db, 'recipeStats', recipeId);
        statsUpdateBatch.set(statRef, {
          id: recipeId,
          totalReviews: stats.totalReviews,
          averageRating: stats.totalRating / stats.totalReviews
        });
      }

      // 5. Commit batch update stats
      await statsUpdateBatch.commit();
      
      console.log('Import dữ liệu thành công!');
      return true;
    } catch (error) {
      console.error('Lỗi khi import dữ liệu:', error);
      return false;
    }
  }
}; 