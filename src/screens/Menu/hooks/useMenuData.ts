import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Recipe } from '../../../types';
import { removeRecipe } from '../../../utils/storage';
import { useRecipes } from '../../../context/RecipeContext';

export const useMenuData = () => {
  const { savedRecipes, refreshSavedRecipes } = useRecipes();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await refreshSavedRecipes();
    setIsLoading(false);
  };

  const handleDeleteRecipe = async (recipe: Recipe) => {
    Alert.alert(
      "Xác nhận xóa",
      `Bạn có chắc muốn xóa công thức "${recipe.name}" không?`,
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            const success = await removeRecipe(recipe.id);
            if (success) {
              await refreshSavedRecipes();
              Alert.alert("Thành công", "Đã xóa công thức");
            }
          },
        },
      ]
    );
  };

  return {
    savedRecipes,
    isRefreshing,
    isLoading,
    refreshSavedRecipes,
    handleDeleteRecipe
  };
};
