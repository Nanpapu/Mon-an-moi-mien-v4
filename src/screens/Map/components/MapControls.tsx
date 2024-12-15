import React from "react";
import { View, StyleSheet } from "react-native";
import { RandomRecipeButton } from '../../../components/buttons';
import { SearchBar } from '../../../components/shared';
import { useTheme } from "../../../theme/ThemeContext";
import { Region } from "../../../types";

interface Props {
  onRefresh: () => void;
  regions: Region[];
  onRandomSelect: (
    latitude: number,
    longitude: number,
    recipes: any[]
  ) => void;
}

export function MapControls({ onRefresh, regions, onRandomSelect }: Props) {
  const { theme } = useTheme();

  return (
    <>
      <View style={[
        styles.searchContainer,
        {
          backgroundColor: theme.colors.background.paper,
          ...theme.shadows.sm
        }
      ]}>
        <SearchBar
          value=""
          onChangeText={() => {}}
          placeholder="Tìm kiếm địa điểm..."
        />
      </View>

      <RandomRecipeButton
        regions={regions}
        onRandomSelect={onRandomSelect}
      />
    </>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
