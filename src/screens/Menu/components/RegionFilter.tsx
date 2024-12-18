import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, View } from 'react-native';
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
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={[
          styles.filterButton,
          styles.favoriteFilter,
          showFavorites && styles.selectedFavoriteButton,
        ]}
        onPress={onToggleFavorites}
      >
        <View style={styles.favoriteIconContainer}>
          <Ionicons
            name={showFavorites ? 'heart' : 'heart-outline'}
            size={24}
            color={
              showFavorites
                ? theme.colors.primary.contrast
                : theme.colors.error.main
            }
          />
        </View>
      </TouchableOpacity>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <TouchableOpacity
          style={[
            styles.filterButton,
            !selectedRegion && styles.selectedButton,
          ]}
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
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    scrollContainer: {
      paddingLeft: 0,
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
      borderColor: theme.colors.error.main,
      borderWidth: 1.5,
      width: 44,
      height: 44,
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.sm,
    },
    favoriteIconContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedFavoriteButton: {
      backgroundColor: theme.colors.error.main,
      borderColor: theme.colors.error.main,
    },
  });
