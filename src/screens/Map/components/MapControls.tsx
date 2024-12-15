import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "../../../components/shared";
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
    <View style={styles.container}>
      <Button
        variant="outline"
        icon="refresh"
        onPress={onRefresh}
        style={[styles.button, { marginRight: theme.spacing.sm }]}
      >
        Làm mới
      </Button>

      <Button
        icon="dice"
        onPress={() => {
          const allRegions = regions.filter(region => region.recipes.length > 0);
          if (allRegions.length === 0) return;
          
          const randomRegion = allRegions[Math.floor(Math.random() * allRegions.length)];
          onRandomSelect(
            randomRegion.coordinate.latitude,
            randomRegion.coordinate.longitude,
            randomRegion.recipes
          );
        }}
        style={styles.button}
      >
        Ngẫu nhiên
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
  },
  button: {
    borderRadius: 20,
  },
});
