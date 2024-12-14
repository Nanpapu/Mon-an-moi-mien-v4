// Module xử lý lưu trữ dữ liệu local sử dụng AsyncStorage
// Bao gồm các hàm để lưu, lấy và xóa công thức nấu ăn
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '../types';

// Khóa lưu trữ cho danh sách công thức
const SAVED_RECIPES_KEY = '@saved_recipes';

// FUNCTIONS
// Lưu một công thức mới vào storage
export const saveRecipe = async (recipe: Recipe) => {
  try {
    // Lấy danh sách công thức hiện có
    const savedRecipes = await getSavedRecipes();
    // Kiểm tra xem công thức đã tồn tại chưa
    if (!savedRecipes.find(r => r.id === recipe.id)) {
      // Thêm công thức mới vào danh sách
      const newSavedRecipes = [...savedRecipes, recipe];
      // Lưu danh sách mới vào storage
      await AsyncStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(newSavedRecipes));
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
export const removeRecipe = async (recipeId: string) => {
  try {
    // Lấy danh sách hiện tại
    const savedRecipes = await getSavedRecipes();
    // Lọc bỏ công thức cần xóa
    const newSavedRecipes = savedRecipes.filter(recipe => recipe.id !== recipeId);
    // Lưu lại danh sách mới
    await AsyncStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(newSavedRecipes));
    return true;
  } catch (error) {
    console.error('Lỗi khi xóa công thức:', error);
    return false;
  }
};