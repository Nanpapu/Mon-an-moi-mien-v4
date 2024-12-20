import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Typography } from '../../../components/shared';
import { Recipe } from '../../../types';
import { useTheme } from '../../../theme/ThemeContext';
import { ZOOM_LEVELS } from '../hooks/useGridZoom';
import { Ionicons } from '@expo/vector-icons';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { COLLECTIONS } from '../../../constants';
import { FavoriteButton } from '../../../components/buttons';
import { ImageUtils } from '../../../utils/imageUtils';

interface Props {
  recipe: Recipe;
  onPress: () => void;
  width: number;
  config: (typeof ZOOM_LEVELS)[keyof typeof ZOOM_LEVELS];
  onFavoriteChange?: () => void;
  isSelectionMode?: boolean;
  isSelected?: boolean;
  onLongPress?: (recipeId: string) => void;
  onToggleSelect?: () => void;
}

export const RecipeGridItem = ({
  recipe,
  onPress,
  width,
  config,
  onFavoriteChange,
  isSelectionMode = false,
  isSelected = false,
  onLongPress,
  onToggleSelect,
}: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme, width, config);
  const [stats, setStats] = useState({ averageRating: 0, totalReviews: 0 });
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, COLLECTIONS.RECIPE_STATS, recipe.id),
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setStats({
            averageRating: data.averageRating || 0,
            totalReviews: data.totalReviews || 0,
          });
        }
      }
    );
    return () => unsubscribe();
  }, [recipe.id]);

  useEffect(() => {
    const loadImage = async () => {
      if (recipe.image) {
        const url = await ImageUtils.getRecipeImageUrl(recipe.image);
        setImageUrl(url);
      }
    };
    loadImage();
  }, [recipe.image]);

  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <Ionicons
        key={index}
        name={index < stats.averageRating ? 'star' : 'star-outline'}
        size={12}
        color={theme.colors.warning.main}
        style={{ marginRight: 2 }}
      />
    ));
  };

  const handlePress = () => {
    if (isSelectionMode) {
      onToggleSelect?.();
    } else {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.containerSelected,
      ]}
      onPress={handlePress}
      onLongPress={() => onLongPress?.(recipe.id)}
      activeOpacity={0.7}
      delayLongPress={300}
    >
      {isSelectionMode && (
        <View style={styles.checkboxContainer}>
          <Ionicons
            name={isSelected ? 'checkbox' : 'square-outline'}
            size={24}
            color={
              isSelected 
                ? theme.colors.primary.main 
                : theme.colors.text.secondary
            }
          />
        </View>
      )}

      <FavoriteButton recipe={recipe} onToggle={onFavoriteChange} />
      <Image
        source={imageUrl || require('../../../../assets/default-avatar.png')}
        style={[styles.image, { width, height: width }]}
        contentFit="cover"
        transition={200}
      />
      {config.showTitle && (
        <View style={styles.infoContainer}>
          <View
            style={[styles.nameContainer, { minHeight: config.minTitleHeight }]}
          >
            <Typography
              variant="body2"
              numberOfLines={config.titleLines || 2}
              style={styles.name}
            >
              {recipe.name}
            </Typography>
          </View>

          {config.showRating && (
            <>
              <View style={styles.divider} />
              <View
                style={[
                  styles.ratingContainer,
                  { minHeight: config.minRatingHeight },
                ]}
              >
                {stats.totalReviews > 0 ? (
                  <View style={styles.ratingContainer}>
                    <View style={styles.starsContainer}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Ionicons
                          key={star}
                          name={
                            star <= stats.averageRating
                              ? 'star'
                              : 'star-outline'
                          }
                          size={12}
                          color={theme.colors.warning.main}
                          style={{ marginRight: 2 }}
                        />
                      ))}
                      <Typography variant="caption" style={styles.reviewCount}>
                        ({stats.totalReviews})
                      </Typography>
                    </View>
                  </View>
                ) : (
                  <View style={styles.noReviewsContainer}>
                    <Ionicons
                      name="star-outline"
                      size={12}
                      color={theme.colors.text.secondary}
                    />
                    <Typography variant="caption" style={styles.noReviews}>
                      Chưa có đánh giá
                    </Typography>
                  </View>
                )}
              </View>
            </>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const createStyles = (
  theme: any,
  width: number,
  config: (typeof ZOOM_LEVELS)[keyof typeof ZOOM_LEVELS]
) =>
  StyleSheet.create({
    container: {
      width: width,
      backgroundColor: theme.colors.background.paper,
      borderRadius: theme.spacing.md,
      overflow: 'hidden',
      ...theme.shadows.sm,
      margin: config.spacing / 2,
      transform: [{ scale: 1 }],
    },
    containerSelected: {
      transform: [{ scale: 0.95 }],
      opacity: 0.8,
    },
    image: {
      width: '100%',
      height: width,
      backgroundColor: theme.colors.background.default,
    },
    infoContainer: {
      padding: theme.spacing.sm,
    },
    nameContainer: {
      minHeight: config.minTitleHeight,
      justifyContent: 'center',
    },
    name: {
      textAlign: 'center',
      fontWeight: '500',
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.divider,
      marginVertical: theme.spacing.xs,
    },
    ratingContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: config.minRatingHeight,
      gap: theme.spacing.xs,
    },
    starsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    reviewCount: {
      color: theme.colors.text.secondary,
      fontSize: 12,
      marginLeft: theme.spacing.xs,
    },
    noReviewsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.xxs,
    },
    noReviews: {
      color: theme.colors.text.secondary,
      fontSize: 10,
    },
    checkboxContainer: {
      position: 'absolute',
      top: theme.spacing.sm,
      left: theme.spacing.sm,
      zIndex: 1,
      backgroundColor: theme.colors.background.paper,
      borderRadius: 20,
      padding: 4,
      ...theme.shadows.sm,
    },
  });
