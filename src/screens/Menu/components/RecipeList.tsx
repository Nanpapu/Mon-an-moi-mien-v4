import React, { useState } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import { Recipe } from '../../../types';
import { RecipeGridItem } from './RecipeGridItem';
import { RecipeDetailModal } from './RecipeDetailModal';
import { EmptyState } from './EmptyState';
import { createStyles } from '../styles';
import { useTheme } from '../../../theme/ThemeContext';

interface Props {
  isLoading: boolean;
  isRefreshing: boolean;
  filteredRecipes: Recipe[];
  savedRecipes: Recipe[];
  onRefresh: () => void;
  onDeleteRecipe: (recipe: Recipe) => Promise<void>;
}

export const RecipeList = ({
  isLoading,
  isRefreshing,
  filteredRecipes,
  savedRecipes,
  onRefresh,
  onDeleteRecipe,
}: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <>
      <ScrollView
        style={styles.recipeList}
        contentContainerStyle={styles.gridContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary.main]}
            tintColor={theme.colors.primary.main}
          />
        }
      >
        {filteredRecipes.length === 0 ? (
          <EmptyState hasRecipes={savedRecipes.length > 0} />
        ) : (
          <View style={styles.grid}>
            {filteredRecipes.map((recipe) => (
              <RecipeGridItem
                key={recipe.id}
                recipe={recipe}
                onPress={() => setSelectedRecipe(recipe)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <RecipeDetailModal
        visible={!!selectedRecipe}
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        onDelete={onDeleteRecipe}
      />
    </>
  );
};
