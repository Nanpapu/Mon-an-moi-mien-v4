import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Recipe } from '../../../types';
import { RecipeCard } from '../../../components/recipe';
import { Typography } from '../../../components/shared';
import { useTheme } from '../../../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  visible: boolean;
  recipe: Recipe | null;
  onClose: () => void;
  onDelete: (recipe: Recipe) => void;
}

export const RecipeDetailModal = ({
  visible,
  recipe,
  onClose,
  onDelete,
}: Props) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme);

  if (!recipe) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons
              name="close"
              size={24}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>
          <Typography variant="h3">Chi tiết công thức</Typography>
        </View>

        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.content}>
            <RecipeCard
              recipe={recipe}
              onDelete={() => onDelete(recipe)}
              showActions={true}
              showReviews={true}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.default,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.divider,
      backgroundColor: theme.colors.background.paper,
      ...theme.shadows.sm,
    },
    closeButton: {
      marginRight: theme.spacing.md,
      padding: theme.spacing.xs,
    },
    scrollContent: {
      flex: 1,
    },
    content: {
      padding: theme.spacing.md,
    },
  });
