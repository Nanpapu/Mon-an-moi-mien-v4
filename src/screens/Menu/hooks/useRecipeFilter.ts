import { useMemo, useState } from 'react';
import { Recipe } from '../../../types';

export const useRecipeFilter = (savedRecipes: Recipe[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const filteredRecipes = useMemo(() => {
    return savedRecipes.filter((recipe) => {
      const matchesSearch =
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some((i) =>
          i.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesRegion = !selectedRegion || recipe.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [savedRecipes, searchQuery, selectedRegion]);

  const regions = useMemo(() => {
    return Array.from(new Set(savedRecipes.map((r) => r.region)));
  }, [savedRecipes]);

  return {
    searchQuery,
    setSearchQuery,
    selectedRegion,
    setSelectedRegion,
    filteredRecipes,
    regions,
  };
};
