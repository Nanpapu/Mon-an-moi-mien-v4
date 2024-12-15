import React from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import { styles } from "../styles";

interface Props {
  regions: string[];
  selectedRegion: string | null;
  onSelectRegion: (region: string | null) => void;
}

export const RegionFilter = ({
  regions,
  selectedRegion,
  onSelectRegion,
}: Props) => {
  return (
    <ScrollView
      horizontal
      style={styles.filterContainer}
      showsHorizontalScrollIndicator={false}
    >
      <TouchableOpacity
        style={[
          styles.filterButton,
          !selectedRegion && styles.filterButtonActive,
        ]}
        onPress={() => onSelectRegion(null)}
      >
        <Text style={styles.filterText}>Tất cả</Text>
      </TouchableOpacity>
      {regions.map((region) => (
        <TouchableOpacity
          key={region}
          style={[
            styles.filterButton,
            selectedRegion === region && styles.filterButtonActive,
          ]}
          onPress={() => onSelectRegion(region)}
        >
          <Text style={styles.filterText}>{region}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
