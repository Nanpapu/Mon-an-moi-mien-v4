import React from 'react';
import { View, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Typography } from '../../../components/shared';
import { Recipe } from '../../../types';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../theme/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RecipeCard } from '../../../components/recipe';

interface Props {
  visible: boolean;
  recipe: Recipe | null;
  onClose: () => void;
  onDelete?: (recipe: Recipe) => void;
}

export const RecipeDetailModal = ({ visible, recipe, onClose, onDelete }: Props) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  if (!recipe) return null;

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
              Chi tiết công thức
            </Typography>
          </View>

          {onDelete && (
            <TouchableOpacity
              onPress={() => onDelete(recipe)}
              style={{
                padding: theme.spacing.sm,
              }}
            >
              <Ionicons
                name="trash-outline"
                size={24}
                color={theme.colors.error.main}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Recipe Content */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            padding: theme.spacing.md,
            paddingBottom: insets.bottom + theme.spacing.xl,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.background.paper,
              borderRadius: theme.spacing.md,
              ...theme.shadows.sm,
            }}
          >
            <RecipeCard
              recipe={recipe}
              showActions={false}
              showReviews={true}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
