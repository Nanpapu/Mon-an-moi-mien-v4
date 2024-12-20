// Module xử lý lưu trữ dữ liệu local sử dụng AsyncStorage
// Bao gồm các hàm để lưu, lấy và xóa công thức nấu ăn
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe, Region } from '../types';

// Khóa lưu trữ cho danh sách công thức
const SAVED_RECIPES_KEY = '@saved_recipes';

// FUNCTIONS
// Lưu một công thức mới vào storage
export const saveRecipe = async (recipe: Recipe, region: Region) => {
  try {
    const savedRecipes = await getSavedRecipes();

    // Lấy regionId từ id của recipe (vd: "01_01" -> "01")
    const regionId = region.id;

    const updatedRecipe = {
      ...recipe,
      image: recipe.image.startsWith('http')
        ? `recipes/images/${regionId}/${recipe.id}.jpg`
        : recipe.image,
    };

    if (!savedRecipes.find((r) => r.id === recipe.id)) {
      const newSavedRecipes = [...savedRecipes, updatedRecipe];
      await AsyncStorage.setItem(
        SAVED_RECIPES_KEY,
        JSON.stringify(newSavedRecipes)
      );
      return true;
    }
    return false;
  } catch (error) {
    console.error('Lỗi khi lưu công thức:', error);
    return false;
  }
};

// Lấy danh sách tất cả công thức đã lưu
export const getSavedRecipes = async (): Promise<Recipe[]> => {
  try {
    // Đọc dữ liệu từ storage
    const savedRecipes = await AsyncStorage.getItem(SAVED_RECIPES_KEY);
    // Chuyển đổi từ JSON string sang mảng object
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  } catch (error) {
    console.error('Lỗi khi lấy công thức đã lưu:', error);
    return [];
  }
};

// Xóa một công thức khỏi danh sách đã lưu
export const removeRecipe = async (recipeId: string): Promise<boolean> => {
  try {
    // Lấy danh sách công thức hiện tại
    const savedRecipesStr = await AsyncStorage.getItem(SAVED_RECIPES_KEY);
    if (!savedRecipesStr) return false;

    const savedRecipes: Recipe[] = JSON.parse(savedRecipesStr);

    // Lọc bỏ công thức cần xóa
    const updatedRecipes = savedRecipes.filter(
      (recipe) => recipe.id !== recipeId
    );

    // Lưu lại danh sách mới
    await AsyncStorage.setItem(
      SAVED_RECIPES_KEY,
      JSON.stringify(updatedRecipes)
    );

    return true;
  } catch (error) {
    console.error('Lỗi khi xóa công thức:', error);
    return false;
  }
};

export const migrateSavedRecipes = async () => {
  try {
    const savedRecipes = await getSavedRecipes();

    const updatedRecipes = savedRecipes.map((recipe) => {
      const regionId = recipe.id.split('_')[0];
      return {
        ...recipe,
        regionId,
        image: recipe.image.startsWith('http')
          ? `recipes/images/${regionId}/${recipe.id}.jpg`
          : recipe.image,
      };
    });

    await AsyncStorage.setItem(
      SAVED_RECIPES_KEY,
      JSON.stringify(updatedRecipes)
    );

    return true;
  } catch (error) {
    console.error('Lỗi khi migrate dữ liệu:', error);
    return false;
  }
};
