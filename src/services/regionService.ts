import { db } from '../config/firebase';
import { collection, getDocs, doc, getDoc, query, where, setDoc, addDoc, Timestamp, writeBatch } from 'firebase/firestore';
import { Region, Recipe } from '../types';
import { regions } from '../data/regions';
import { COLLECTIONS } from '../constants/collections';

export const RegionService = {
  getAllRegions: async (): Promise<Region[]> => {
    try {
      const regionsSnapshot = await getDocs(collection(db, COLLECTIONS.REGIONS));
      const regions: Region[] = [];
      
      for (const doc of regionsSnapshot.docs) {
        const regionData = doc.data();
        const recipesSnapshot = await getDocs(
          query(collection(db, COLLECTIONS.RECIPES), where('regionId', '==', doc.id))
        );
        
        const recipes = recipesSnapshot.docs.map(recipeDoc => recipeDoc.data() as Recipe);
        
        regions.push({
          id: doc.id, // Thêm id từ document
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

  getRegionById: async (regionId: string): Promise<Region | null> => {
    try {
      const regionDoc = await getDoc(doc(db, COLLECTIONS.REGIONS, regionId));
      if (!regionDoc.exists()) return null;

      const regionData = regionDoc.data();
      const recipesSnapshot = await getDocs(
        query(collection(db, COLLECTIONS.RECIPES), where('regionId', '==', regionId))
      );
      
      const recipes = recipesSnapshot.docs.map(doc => ({
        id: doc.id, // Thêm id từ document
        ...doc.data()
      }) as Recipe);
      
      return {
        id: regionDoc.id, // Thêm id từ document
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

      for (const region of regions) {
        const { recipes: regionRecipes, ...regionData } = region;
        
        // Tạo document cho region
        const regionRef = doc(db, COLLECTIONS.REGIONS, region.id);
        batch.set(regionRef, regionData);
        
        // Tạo documents cho recipes
        for (const recipe of regionRecipes) {
          const recipeRef = doc(db, COLLECTIONS.RECIPES, recipe.id);
          batch.set(recipeRef, {
            ...recipe,
            regionId: region.id,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            averageRating: 0,
            totalReviews: 0
          });
        }
      }

      await batch.commit();
      console.log('Import dữ liệu thành công!');
      return true;
    } catch (error) {
      console.error('Lỗi khi import dữ liệu:', error);
      return false;
    }
  }
};