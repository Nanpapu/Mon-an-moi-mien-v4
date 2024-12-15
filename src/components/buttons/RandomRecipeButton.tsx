import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Typography } from '../shared';
import { useTheme } from '../../theme/ThemeContext';
import { Ionicons } from "@expo/vector-icons";
import { Region } from '../../types';

interface Props {
  regions: Region[];
  onRandomSelect: (latitude: number, longitude: number, recipes: any[]) => void;
}

export function RandomRecipeButton({ regions, onRandomSelect }: Props) {
  const { theme } = useTheme();

  const handleRandomRecipe = () => {
    const allRegions = regions.filter(region => region.recipes.length > 0);
    if (allRegions.length === 0) return;

    const randomRegion = allRegions[Math.floor(Math.random() * allRegions.length)];
    
    onRandomSelect(
      randomRegion.coordinate.latitude,
      randomRegion.coordinate.longitude,
      randomRegion.recipes
    );
  };

  return (
    <TouchableOpacity 
      style={[
        styles.button,
        {
          backgroundColor: theme.colors.primary.main,
          ...theme.shadows.md,
        }
      ]} 
      onPress={handleRandomRecipe}
    >
      <Ionicons 
        name="dice" 
        size={24} 
        color={theme.colors.primary.contrast}
        style={{ marginRight: theme.spacing.sm }}
      />
      <Typography
        variant="body1"
        style={{ color: theme.colors.primary.contrast }}
      >
        Công Thức Ngẫu Nhiên
      </Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
