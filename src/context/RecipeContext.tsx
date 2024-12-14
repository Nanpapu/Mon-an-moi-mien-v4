import React, { createContext, useState, useContext, useEffect } from 'react';
import { Recipe } from '../types';
import { getSavedRecipes } from '../utils/storage';

interface RecipeContextType {
  savedRecipes: Recipe[];
  refreshSavedRecipes: () => Promise<void>;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);

  const refreshSavedRecipes = async () => {
    const recipes = await getSavedRecipes();
    setSavedRecipes(recipes);
  };

  useEffect(() => {
    refreshSavedRecipes();
  }, []);

  return (
    <RecipeContext.Provider value={{ savedRecipes, refreshSavedRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
} 