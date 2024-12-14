import { db } from '../config/firebase';
import { collection, getDocs, doc, getDoc, query, where, setDoc, addDoc, Timestamp } from 'firebase/firestore';
import { Region, Recipe } from '../types';
import { regions } from '../data/regions';
import { recipeStats } from '../data/recipeStats';
import { reviews } from '../data/reviews';

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
      // Import regions và recipes
      for (const region of regions) {
        const { recipes: regionRecipes, ...regionData } = region;
        
        // Import region
        await setDoc(doc(db, 'regions', region.id), {
          id: region.id,
          name: region.name,
          coordinate: region.coordinate
        });
        
        // Import recipes
        for (const recipe of regionRecipes) {
          await setDoc(doc(db, 'recipes', recipe.id), {
            ...recipe,
            regionId: region.id
          });
        }
      }

      // Import recipeStats
      for (const stat of recipeStats) {
        await setDoc(doc(db, 'recipeStats', stat.id), stat);
      }

      // Import reviews (nếu có)
      for (const review of reviews) {
        await addDoc(collection(db, 'reviews'), {
          ...review,
          createdAt: Timestamp.fromDate(review.createdAt),
          updatedAt: Timestamp.fromDate(review.updatedAt)
        });
      }
      
      console.log('Import dữ liệu thành công!');
      return true;
    } catch (error) {
      console.error('Lỗi khi import dữ liệu:', error);
      return false;
    }
  }
}; 