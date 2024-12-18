import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { FavoriteService } from '../../services/favoriteService';
import { Recipe } from '../../types';

interface Props {
  recipe: Recipe;
  size?: number;
  style?: any;
}

export function FavoriteButton({ recipe, size = 24, style }: Props) {
  const { theme } = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkFavoriteStatus();
  }, [recipe.id]);

  const checkFavoriteStatus = async () => {
    const status = await FavoriteService.isFavorite(recipe.id);
    setIsFavorite(status);
    setIsLoading(false);
  };

  const toggleFavorite = async () => {
    setIsLoading(true);
    try {
      if (isFavorite) {
        await FavoriteService.removeFavorite(recipe.id);
      } else {
        await FavoriteService.addFavorite(recipe);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Lỗi khi thay đổi trạng thái yêu thích:', error);
    }
    setIsLoading(false);
  };

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={toggleFavorite}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={theme.colors.primary.main} />
      ) : (
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={size}
          color={
            isFavorite ? theme.colors.error.main : theme.colors.text.primary
          }
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
});
