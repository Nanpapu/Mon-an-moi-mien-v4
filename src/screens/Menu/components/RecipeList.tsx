import React, { useState } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import { Recipe } from '../../../types';
import { RecipeGridItem } from './RecipeGridItem';
import { RecipeDetailModal } from './RecipeDetailModal';
import { EmptyState } from './EmptyState';
import { createStyles } from '../styles';
import { useTheme } from '../../../theme/ThemeContext';
import { useGridZoom } from '../hooks/useGridZoom';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  isLoading: boolean;
  isRefreshing: boolean;
  filteredRecipes: Recipe[];
  savedRecipes: Recipe[];
  onRefresh: () => void;
  onDeleteRecipe: (recipe: Recipe) => Promise<void>;
  currentConfig: any;
  calculateItemWidth: () => number;
  onFavoriteChange: () => void;
  isSelectionMode?: boolean;
  selectedRecipes?: Set<string>;
  onLongPress?: (recipeId: string) => void;
  onToggleSelect?: (recipeId: string) => void;
}

export const RecipeList = ({
  isLoading,
  isRefreshing,
  filteredRecipes,
  savedRecipes,
  onRefresh,
  onDeleteRecipe,
  currentConfig,
  calculateItemWidth,
  onFavoriteChange,
  isSelectionMode = false,
  selectedRecipes = new Set(),
  onLongPress,
  onToggleSelect,
}: Props) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  if (!isLoading && filteredRecipes.length === 0) {
    return (
      <EmptyState 
        hasRecipes={savedRecipes.length > 0} 
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    );
  }

  return (
    <>
      <ScrollView
        style={styles.recipeList}
        contentContainerStyle={styles.gridContainer}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.grid}>
          {filteredRecipes.map((recipe) => (
            <RecipeGridItem
              key={recipe.id}
              recipe={recipe}
              onPress={() => setSelectedRecipe(recipe)}
              width={calculateItemWidth()}
              config={currentConfig}
              onFavoriteChange={onFavoriteChange}
              isSelectionMode={isSelectionMode}
              isSelected={selectedRecipes.has(recipe.id)}
              onLongPress={() => onLongPress?.(recipe.id)}
              onToggleSelect={() => onToggleSelect?.(recipe.id)}
            />
          ))}
        </View>
      </ScrollView>

      {!isSelectionMode && (
        <RecipeDetailModal
          visible={!!selectedRecipe}
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onDelete={onDeleteRecipe}
        />
      )}
    </>
  );
};
