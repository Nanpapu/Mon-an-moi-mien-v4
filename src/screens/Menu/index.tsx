import React from "react";
import { View } from "react-native";
import { useTheme } from '../../theme/ThemeContext';
import { Loading } from '../../components/shared';
import { SearchBar } from "../../components/inputs";
import { useMenuData } from "./hooks/useMenuData";
import { useRecipeFilter } from "./hooks/useRecipeFilter";
import { RegionFilter } from "./components/RegionFilter";
import { RecipeList } from "./components/RecipeList";

export default function MenuScreen() {
  const { theme } = useTheme();
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
    <View style={{ 
      flex: 1, 
      backgroundColor: theme.colors.background.default 
    }}>
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

      {isLoading ? (
        <Loading text="Đang tải..." />
      ) : (
        <RecipeList
          isRefreshing={isRefreshing}
          isLoading={isLoading}
          filteredRecipes={filteredRecipes}
          savedRecipes={savedRecipes}
          onRefresh={refreshSavedRecipes}
          onDeleteRecipe={handleDeleteRecipe}
        />
      )}
    </View>
  );
}
