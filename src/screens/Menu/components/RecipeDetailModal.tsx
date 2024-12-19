import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Image } from 'expo-image';
import { Recipe } from '../../../types';
import { RecipeCard } from '../../../components/recipe';
import { Typography } from '../../../components/shared';
import { Theme, useTheme } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';
import { ImageUtils } from '../../../utils/imageUtils';

interface Props {
  visible: boolean;
  recipe: Recipe | null;
  onClose: () => void;
  onDelete?: (recipe: Recipe) => void;
}

export const RecipeDetailModal = ({ visible, recipe, onClose, onDelete }: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Thêm useEffect để xử lý ảnh
  useEffect(() => {
    const loadImage = async () => {
      if (recipe?.image) {
        const url = await ImageUtils.getRecipeImageUrl(recipe.image);
        setImageUrl(url);
      }
    };
    loadImage();
  }, [recipe?.image]);

  if (!recipe) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header với nút đóng */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={theme.colors.text.primary} />
            </TouchableOpacity>
            {onDelete && (
              <TouchableOpacity
                onPress={() => onDelete(recipe)}
                style={styles.deleteButton}
              >
                <Ionicons
                  name="trash-outline"
                  size={24}
                  color={theme.colors.error.main}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Nội dung chi tiết công thức */}
          <ScrollView style={styles.scrollContent}>
            {/* Ảnh món ăn */}
            <Image
              source={imageUrl || require('../../../../assets/default-avatar.png')}
              style={styles.recipeImage}
              contentFit="cover"
              transition={200}
            />

            {/* Tên món và vùng miền */}
            <View style={styles.content}>
              <Typography variant="h3" style={styles.recipeName}>
                {recipe.name}
              </Typography>
              <Typography variant="body2" color="secondary">
                {recipe.region}
              </Typography>

              {/* Nguyên liệu */}
              <View style={styles.section}>
                <Typography variant="h3" style={styles.sectionTitle}>
                  Nguyên liệu
                </Typography>
                {recipe.ingredients.map((ingredient, index) => (
                  <Typography key={index} variant="body2" style={styles.ingredient}>
                    • {ingredient}
                  </Typography>
                ))}
              </View>

              {/* Cách làm */}
              <View style={styles.section}>
                <Typography variant="h3" style={styles.sectionTitle}>
                  Cách làm
                </Typography>
                {recipe.instructions.map((step, index) => (
                  <Typography key={index} variant="body2" style={styles.instruction}>
                    {index + 1}. {step}
                  </Typography>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      flex: 1,
      backgroundColor: theme.colors.background.paper,
      marginTop: 50,
      borderTopLeftRadius: theme.spacing.lg,
      borderTopRightRadius: theme.spacing.lg,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: theme.spacing.md,
    },
    closeButton: {
      padding: theme.spacing.xs,
    },
    deleteButton: {
      padding: theme.spacing.xs,
    },
    scrollContent: {
      flex: 1,
    },
    recipeImage: {
      width: '100%',
      height: 250,
    },
    content: {
      padding: theme.spacing.md,
    },
    recipeName: {
      marginBottom: theme.spacing.xs,
    },
    section: {
      marginTop: theme.spacing.lg,
    },
    sectionTitle: {
      marginBottom: theme.spacing.sm,
    },
    ingredient: {
      marginBottom: theme.spacing.xs,
    },
    instruction: {
      marginBottom: theme.spacing.sm,
    },
  });
