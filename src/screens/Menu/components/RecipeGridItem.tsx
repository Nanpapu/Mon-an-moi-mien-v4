import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Typography } from '../../../components/shared';
import { Recipe } from '../../../types';
import { useTheme } from '../../../theme/ThemeContext';
import { ZOOM_LEVELS } from '../hooks/useGridZoom';

interface Props {
  recipe: Recipe;
  onPress: () => void;
  width: number;
  config: (typeof ZOOM_LEVELS)[keyof typeof ZOOM_LEVELS];
}

export const RecipeGridItem = ({ recipe, onPress, width, config }: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme, width, config);

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
        <Typography variant="body2" numberOfLines={2} style={styles.name}>
          {recipe.name}
        </Typography>
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
    name: {
      padding: theme.spacing.sm,
      textAlign: 'center',
      minHeight: config.minTitleHeight,
    },
  });
