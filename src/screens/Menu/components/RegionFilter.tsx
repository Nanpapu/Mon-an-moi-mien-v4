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
          variant="body2"
          style={{
            color: !selectedRegion ? '#FFFFFF' : theme.colors.primary.main,
            fontSize: 14,
          }}
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
            variant="body2"
            style={{
              color: selectedRegion === region ? '#FFFFFF' : theme.colors.primary.main,
              fontSize: 14,
            }}
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
    paddingVertical: 8,
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
