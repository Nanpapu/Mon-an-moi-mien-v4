import React from 'react';
import { View, ScrollView, Animated } from 'react-native';
import { Modal, Typography, Button } from '../../../components/shared';
import { RecipeCard } from '../../../components/recipe';
import { useTheme } from '../../../theme/ThemeContext';
import { Recipe } from '../../../types';

interface Props {
  visible: boolean;
  onClose: () => void;
  recipes: Recipe[];
  onSaveRecipe: (recipe: Recipe) => void;
  slideAnim: Animated.Value;
}

export function RecipeModal({
  visible,
  onClose,
  recipes,
  onSaveRecipe,
  slideAnim,
}: Props) {
  const { theme } = useTheme();

  return (
    <Modal 
      visible={visible}
      onClose={onClose}
      animationType="slide"
    >
      <View style={{ flex: 1 }}>
        <Typography
          variant="h2"
          style={{ 
            marginBottom: theme.spacing.md,
            paddingHorizontal: theme.spacing.md 
          }}
        >
          Các món ăn trong vùng
        </Typography>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: theme.spacing.md }}
        >
          {recipes.map((recipe) => (
            <Animated.View
              key={recipe.id}
              style={{
                transform: [{ translateY: slideAnim }],
              }}
            >
              <RecipeCard
                recipe={recipe}
                onSave={() => onSaveRecipe(recipe)}
                showActions={true}
                showReviews={true}
              />
            </Animated.View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}
