import { useState, useEffect } from 'react';
import { Recipe } from '../../../types';
import { removeRecipe } from '../../../utils/storage';
import { useRecipes } from '../../../context/RecipeContext';
import { useDialog } from '../../../hooks/useDialog';

export const useMenuData = () => {
  const { savedRecipes, refreshSavedRecipes } = useRecipes();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { confirm, alert } = useDialog();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await refreshSavedRecipes();
    setIsLoading(false);
  };

  const handleDeleteRecipe = async (recipe: Recipe) => {
    const confirmed = await confirm({
      title: "Xác nhận xóa",
      message: `Bạn có chắc muốn xóa công thức "${recipe.name}" không?`,
      type: 'danger'
    });

    if (confirmed) {
      const success = await removeRecipe(recipe.id);
      if (success) {
        await refreshSavedRecipes();
        await alert({
          title: "Thành công",
          message: "Đã xóa công thức",
          type: 'success'
        });
      }
    }
  };

  return {
    savedRecipes,
    isRefreshing,
    isLoading,
    refreshSavedRecipes,
    handleDeleteRecipe
  };
};
