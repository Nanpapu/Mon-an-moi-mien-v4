import React from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import { Recipe } from '../../../types';
import { RecipeCard } from '../../../components/recipe';
import { RecipeCardSkeleton } from '../../../components/recipe';
import { EmptyState } from './EmptyState';
import { createStyles } from '../styles';
import { useTheme } from '../../../theme/ThemeContext';

interface Props {
  isLoading: boolean;
  isRefreshing: boolean;
  filteredRecipes: Recipe[];
  savedRecipes: Recipe[];
  onRefresh: () => void;
  onDeleteRecipe: (recipe: Recipe) => void;
}

export const RecipeList = ({
  isLoading,
  isRefreshing,
  filteredRecipes,
  savedRecipes,
  onRefresh,
  onDeleteRecipe
}: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ScrollView
      style={styles.recipeList}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          colors={[theme.colors.primary.main]}
          tintColor={theme.colors.primary.main}
        />
      }
    >
      {isLoading ? (
        <>
          <RecipeCardSkeleton />
          <RecipeCardSkeleton />
          <RecipeCardSkeleton />
        </>
      ) : filteredRecipes.length === 0 ? (
        <EmptyState hasRecipes={savedRecipes.length > 0} />
      ) : (
        filteredRecipes.map((recipe) => (
          <View key={recipe.id} style={styles.recipeCard}>
            <RecipeCard
              recipe={recipe}
              onDelete={() => onDeleteRecipe(recipe)}
              showActions={true}
              showReviews={true}
            />
          </View>
        ))
      )}
    </ScrollView>
  );
};
