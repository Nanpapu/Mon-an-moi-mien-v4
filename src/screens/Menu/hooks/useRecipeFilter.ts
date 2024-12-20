import { useMemo, useState, useEffect } from 'react';
import { Recipe } from '../../../types';
import { FavoriteService } from '../../../services/favoriteService';

export const useRecipeFilter = (savedRecipes: Recipe[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const favorites = await FavoriteService.getFavorites();
    setFavoriteRecipes(favorites);
  };

  const filteredRecipes = useMemo(() => {
    let recipes = [...savedRecipes];

    if (selectedRegion) {
      recipes = recipes.filter((recipe) => recipe.region === selectedRegion);
    }

    recipes = recipes.filter((recipe) => {
      const matchesSearch =
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some((i) =>
          i.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesSearch;
    });

    if (showFavorites) {
      return recipes.filter((recipe) =>
        favoriteRecipes.some((fav) => fav.id === recipe.id)
      );
    }

    return [
      ...recipes.filter((recipe) =>
        favoriteRecipes.some((fav) => fav.id === recipe.id)
      ),
      ...recipes.filter(
        (recipe) => !favoriteRecipes.some((fav) => fav.id === recipe.id)
      ),
    ];
  }, [savedRecipes, searchQuery, selectedRegion, showFavorites]);

  useEffect(() => {
    if (!showFavorites) {
      loadFavorites();
    }
  }, [showFavorites]);

  return {
    searchQuery,
    setSearchQuery,
    selectedRegion,
    setSelectedRegion,
    showFavorites,
    setShowFavorites,
    filteredRecipes,
    regions: Array.from(new Set(savedRecipes.map((r) => r.region))),
    refreshFavorites: loadFavorites,
  };
};
