import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Typography } from '../../../components/shared';
import { useTheme } from '../../../theme/ThemeContext';

interface Props {
  regions: string[];
  selectedRegion: string | null;
  onSelectRegion: (region: string | null) => void;
}

export const RegionFilter = ({ regions, selectedRegion, onSelectRegion }: Props) => {
  const { theme } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={[
          styles.chip,
          {
            backgroundColor: !selectedRegion 
              ? theme.colors.primary.main 
              : theme.colors.background.paper,
            borderColor: theme.colors.primary.main,
          },
        ]}
        onPress={() => onSelectRegion(null)}
      >
        <Typography
          variant="button"
          color={!selectedRegion ? "contrast" : "primary"}
        >
          Tất cả
        </Typography>
      </TouchableOpacity>

      {regions.map((region) => (
        <TouchableOpacity
          key={region}
          style={[
            styles.chip,
            {
              backgroundColor: selectedRegion === region 
                ? theme.colors.primary.main 
                : theme.colors.background.paper,
              borderColor: theme.colors.primary.main,
            },
          ]}
          onPress={() => onSelectRegion(region)}
        >
          <Typography
            variant="button"
            color={selectedRegion === region ? "contrast" : "primary"}
          >
            {region}
          </Typography>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
});
