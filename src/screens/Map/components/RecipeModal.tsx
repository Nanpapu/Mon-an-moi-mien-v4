import React, { useEffect } from 'react';
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
  
  useEffect(() => {
    if (visible) {
      console.log('Modal opened with recipes:', recipes);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(0);
    }
  }, [visible]);

  if (!recipes || recipes.length === 0) {
    return null;
  }

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
        backgroundColor: theme.colors.background.paper,
        borderTopLeftRadius: theme.spacing.lg,
        borderTopRightRadius: theme.spacing.lg,
        height: '90%',
      }}>
        <View style={{ 
          padding: theme.spacing.lg,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.divider,
        }}>
          <Typography variant="h2" style={{ fontSize: 24 }}>
            Các món ăn trong vùng ({recipes.length})
          </Typography>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ 
            padding: theme.spacing.lg,
            paddingBottom: theme.spacing.xl * 2
          }}
        >
          {recipes.map((recipe, index) => {
            console.log('Rendering recipe:', recipe);
            return (
              <View 
                key={recipe.id}
                style={{
                  marginBottom: theme.spacing.lg,
                  opacity: 1,
                }}
              >
                <RecipeCard
                  recipe={recipe}
                  onSave={() => onSaveRecipe(recipe)}
                  showActions={true}
                  showReviews={true}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </Modal>
  );
}
