import React from "react";
import { View } from "react-native";
import { SearchBar } from "../../components/inputs";
import { styles } from "./styles";
import { useMenuData } from "./hooks/useMenuData";
import { useRecipeFilter } from "./hooks/useRecipeFilter";
import { RegionFilter } from "./components/RegionFilter";
import { RecipeList } from "./components/RecipeList";

export default function MenuScreen() {
  const { 
    savedRecipes, 
    isRefreshing, 
    isLoading, 
    refreshSavedRecipes, 
    handleDeleteRecipe 
  } = useMenuData();

  const {
    searchQuery,
    setSearchQuery,
    selectedRegion,
    setSelectedRegion,
    filteredRecipes,
    regions,
  } = useRecipeFilter(savedRecipes);

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Tìm theo tên món hoặc nguyên liệu..."
      />

      <RegionFilter
        regions={regions}
        selectedRegion={selectedRegion}
        onSelectRegion={setSelectedRegion}
      />

      <RecipeList
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        filteredRecipes={filteredRecipes}
        savedRecipes={savedRecipes}
        onRefresh={refreshSavedRecipes}
        onDeleteRecipe={handleDeleteRecipe}
      />
    </View>
  );
}
