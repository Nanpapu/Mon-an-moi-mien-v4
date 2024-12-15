import React from 'react';
import { View, ScrollView, Animated } from 'react-native';
import { Modal, Typography } from '../../../components/shared';
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
      style={{
        margin: 0,
        justifyContent: 'flex-end',
      }}
    >
      <View style={{ 
        maxHeight: '80%',
        backgroundColor: theme.colors.background.paper,
        borderTopLeftRadius: theme.spacing.lg,
        borderTopRightRadius: theme.spacing.lg,
      }}>
        <View style={{ 
          padding: theme.spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.divider,
        }}>
          <Typography variant="h2">
            Các món ăn trong vùng
          </Typography>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: theme.spacing.md }}
        >
          {recipes.map((recipe, index) => (
            <Animated.View
              key={recipe.id}
              style={{
                transform: [{ 
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50 * (index + 1), 0]
                  })
                }],
                opacity: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1]
                })
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
