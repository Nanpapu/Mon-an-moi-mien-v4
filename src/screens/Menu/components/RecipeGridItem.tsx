import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Typography } from '../../../components/shared';
import { Recipe } from '../../../types';
import { useTheme } from '../../../theme/ThemeContext';

const COLUMN_COUNT = 2;
const SPACING = 8;
const windowWidth = Dimensions.get('window').width;
const itemWidth = (windowWidth - SPACING * 3) / COLUMN_COUNT;

interface Props {
  recipe: Recipe;
  onPress: () => void;
}

export const RecipeGridItem = ({ recipe, onPress }: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

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
      <Typography variant="body2" numberOfLines={2} style={styles.name}>
        {recipe.name}
      </Typography>
    </TouchableOpacity>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      width: itemWidth,
      backgroundColor: theme.colors.background.paper,
      borderRadius: theme.spacing.sm,
      overflow: 'hidden',
      ...theme.shadows.sm,
      marginBottom: SPACING * 2,
    },
    image: {
      width: '100%',
      height: itemWidth,
      backgroundColor: theme.colors.background.default,
    },
    name: {
      padding: theme.spacing.sm,
      textAlign: 'center',
      minHeight: 50,
    },
  });
