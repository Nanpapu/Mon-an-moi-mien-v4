import { regions } from './regions';

// Tạo dữ liệu ban đầu cho recipeStats từ regions
export const recipeStats = regions.flatMap(region => 
  region.recipes.map(recipe => ({
    id: recipe.id,
    averageRating: 0,
    totalReviews: 0
  }))
); 