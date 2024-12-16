import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { RandomRecipeButton } from '../../../components/buttons';
import { SearchBar } from '../../../components/shared';
import { useTheme } from "../../../theme/ThemeContext";
import { Ionicons } from '@expo/vector-icons';
import { Region } from "../../../types";

interface Props {
  onRefresh: () => void;
  regions: Region[];
  onRandomSelect: (latitude: number, longitude: number, recipes: any[]) => void;
  onSearch: (query: string) => void;
}

export function MapControls({ onRefresh, regions, onRandomSelect, onSearch }: Props) {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <>
      <View style={[
        styles.searchContainer,
        {
          backgroundColor: theme.colors.background.paper,
          borderWidth: 1,
          borderColor: theme.colors.divider,
          ...theme.shadows.sm
        }
      ]}>
        <View style={styles.searchInputContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Tìm kiếm địa điểm..."
            onSubmitEditing={handleSubmit}
          />
          <TouchableOpacity 
            onPress={handleSubmit}
            style={[
              styles.searchButton, 
              { backgroundColor: theme.colors.primary.main }
            ]}
          >
            <Ionicons 
              name="search" 
              size={20} 
              color={theme.colors.primary.contrast} 
            />
          </TouchableOpacity>
        </View>
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
    left: 16,
    right: 16,
    borderRadius: 8,
    overflow: 'hidden',
    zIndex: 1,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  searchButton: {
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
