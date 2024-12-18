import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Typography } from '../../../components/shared';
import { useTheme } from '../../../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  regions: string[];
  selectedRegion: string | null;
  onSelectRegion: (region: string | null) => void;
  showFavorites: boolean;
  onToggleFavorites: () => void;
}

export const RegionFilter = ({
  regions,
  selectedRegion,
  onSelectRegion,
  showFavorites,
  onToggleFavorites,
}: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={[
          styles.filterButton,
          showFavorites && styles.selectedButton,
          styles.favoriteFilter,
        ]}
        onPress={onToggleFavorites}
      >
        <Ionicons
          name={showFavorites ? 'heart' : 'heart-outline'}
          size={20}
          color={
            showFavorites
              ? theme.colors.primary.contrast
              : theme.colors.text.primary
          }
          style={{ marginRight: theme.spacing.xs }}
        />
        <Typography
          variant="body1"
          style={[styles.buttonText, showFavorites && styles.selectedText]}
        >
          Yêu thích
        </Typography>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.filterButton, !selectedRegion && styles.selectedButton]}
        onPress={() => onSelectRegion(null)}
      >
        <Typography
          variant="body1"
          style={[styles.buttonText, !selectedRegion && styles.selectedText]}
        >
          Tất cả
        </Typography>
      </TouchableOpacity>

      {regions.map((region) => (
        <TouchableOpacity
          key={region}
          style={[
            styles.filterButton,
            selectedRegion === region && styles.selectedButton,
          ]}
          onPress={() => onSelectRegion(region)}
        >
          <Typography
            variant="body1"
            style={[
              styles.buttonText,
              selectedRegion === region && styles.selectedText,
            ]}
          >
            {region}
          </Typography>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      gap: theme.spacing.sm,
    },
    filterButton: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.spacing.sm,
      backgroundColor: theme.colors.background.paper,
      borderWidth: 1,
      borderColor: theme.colors.divider,
    },
    selectedButton: {
      backgroundColor: theme.colors.primary.main,
      borderColor: theme.colors.primary.main,
    },
    buttonText: {
      color: theme.colors.text.primary,
    },
    selectedText: {
      color: theme.colors.primary.contrast,
    },
    favoriteFilter: {
      borderColor: theme.colors.primary.main,
    },
  });
