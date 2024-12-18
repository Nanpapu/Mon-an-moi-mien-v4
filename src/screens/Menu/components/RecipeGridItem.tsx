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

interface Props {
  recipe: Recipe;
  onPress: () => void;
  width: number;
  config: (typeof ZOOM_LEVELS)[keyof typeof ZOOM_LEVELS];
}

export const RecipeGridItem = ({ recipe, onPress, width, config }: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme, width, config);
  const [stats, setStats] = useState({ averageRating: 0, totalReviews: 0 });

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
      },
      (error) => {
        console.error('Lỗi khi lắng nghe thay đổi stats:', error);
      }
    );

    return () => unsubscribe();
  }, [recipe.id]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={recipe.image}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
      {config.showTitle && (
        <View style={styles.infoContainer}>
          <Typography variant="body2" numberOfLines={2} style={styles.name}>
            {recipe.name}
          </Typography>

          {config.showRating && (
            <View style={styles.ratingContainer}>
              <View style={styles.stars}>
                <Ionicons
                  name="star"
                  size={14}
                  color={theme.colors.warning.main}
                />
                <Typography variant="caption" style={styles.ratingText}>
                  {stats.averageRating.toFixed(1)}
                </Typography>
              </View>
              <Typography variant="caption" style={styles.reviewCount}>
                ({stats.totalReviews})
              </Typography>
            </View>
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
      borderRadius: theme.spacing.sm,
      overflow: 'hidden',
      ...theme.shadows.sm,
      margin: config.spacing / 2,
    },
    image: {
      width: '100%',
      height: width,
      backgroundColor: theme.colors.background.default,
    },
    infoContainer: {
      padding: theme.spacing.sm,
    },
    name: {
      textAlign: 'center',
      minHeight: config.minTitleHeight,
      marginBottom: config.showRating ? theme.spacing.xs : 0,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: config.minRatingHeight,
      gap: theme.spacing.xs,
    },
    stars: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
    },
    ratingText: {
      color: theme.colors.text.primary,
    },
    reviewCount: {
      color: theme.colors.text.secondary,
    },
  });
