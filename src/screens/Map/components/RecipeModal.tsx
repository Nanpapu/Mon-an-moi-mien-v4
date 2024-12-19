import React from 'react';
import {
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Typography } from '../../../components/shared';
import { RecipeCard } from '../../../components/recipe';
import { useTheme } from '../../../theme/ThemeContext';
import { Recipe } from '../../../types';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  visible: boolean;
  onClose: () => void;
  recipes: Recipe[];
  onSaveRecipe: (recipe: Recipe) => Promise<boolean>;
}

export function RecipeModal({
  visible,
  onClose,
  recipes,
  onSaveRecipe,
}: Props) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  if (!recipes || recipes.length === 0) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
      style={{ zIndex: 999 }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background.default,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: theme.spacing.md,
            paddingTop: insets.top,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.divider,
            backgroundColor: theme.colors.background.paper,
            ...theme.shadows.sm,
          }}
        >
          <TouchableOpacity
            onPress={onClose}
            style={{
              padding: theme.spacing.sm,
              marginRight: theme.spacing.sm,
            }}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <Typography variant="h2" style={{ fontSize: 20 }}>
              Các món ăn trong vùng
            </Typography>
            <Typography
              variant="body2"
              color="secondary"
              style={{ marginTop: 2 }}
            >
              {recipes.length} công thức
            </Typography>
          </View>
        </View>

        {/* Recipe List */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            padding: theme.spacing.md,
            paddingBottom: insets.bottom + theme.spacing.xl,
          }}
        >
          {recipes.map((recipe) => (
            <View
              key={recipe.id}
              style={{
                marginBottom: theme.spacing.lg,
                backgroundColor: theme.colors.background.paper,
                borderRadius: theme.spacing.md,
                ...theme.shadows.sm,
              }}
            >
              <RecipeCard
                recipe={recipe}
                onSave={async () => await onSaveRecipe(recipe)}
                showActions={true}
                showReviews={true}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}
