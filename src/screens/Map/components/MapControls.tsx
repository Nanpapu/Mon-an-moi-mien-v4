import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RandomRecipeButton } from "../../../components/RandomRecipeButton";
import { Region, Recipe } from "../../../types";
import { styles } from "../styles";

interface Props {
  onRefresh: () => void;
  regions: Region[];
  onRandomSelect: (
    latitude: number,
    longitude: number,
    recipes: Recipe[]
  ) => void;
}

export const MapControls = ({ onRefresh, regions, onRandomSelect }: Props) => {
  return (
    <>
      <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
        <Ionicons name="refresh" size={24} color="#007AFF" />
      </TouchableOpacity>

      <RandomRecipeButton regions={regions} onRandomSelect={onRandomSelect} />
    </>
  );
};
