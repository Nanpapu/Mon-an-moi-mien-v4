import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  TextInput,
} from 'react-native';
import { RandomRecipeButton } from '../../../components/buttons';
import { SearchBar, Typography } from '../../../components/shared';
import { useTheme } from '../../../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { Region } from '../../../types';

interface Props {
  onRefresh: () => void;
  regions: Region[];
  onRandomSelect: (latitude: number, longitude: number, recipes: any[]) => void;
  onSearch: (query: string) => void;
}

export function MapControls({
  onRefresh,
  regions,
  onRandomSelect,
  onSearch,
}: Props) {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const searchWidth = useRef(new Animated.Value(48)).current;
  const reloadTop = useRef(new Animated.Value(20)).current;

  const expandedWidth = Platform.OS === 'ios' ? 358 : 328;

  const toggleSearch = () => {
    const toValue = showSearch ? 48 : expandedWidth;
    const newTop = showSearch ? 20 : 80;

    setShowSearch(!showSearch);

    Animated.parallel([
      Animated.spring(searchWidth, {
        toValue,
        useNativeDriver: false,
        friction: 10,
      }),
      Animated.spring(reloadTop, {
        toValue: newTop,
        useNativeDriver: false,
        friction: 10,
      }),
    ]).start();
  };

  const handleSubmit = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchQuery('');
      toggleSearch();
    }
  };

  return (
    <>
      <Animated.View
        style={[
          styles.searchContainer,
          {
            backgroundColor: theme.colors.background.paper,
            width: searchWidth,
            ...theme.shadows.sm,
          },
        ]}
      >
        {!showSearch ? (
          <TouchableOpacity onPress={toggleSearch} style={styles.searchIcon}>
            <Ionicons
              name="search"
              size={24}
              color={theme.colors.text.secondary}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.searchInputWrapper}>
            <TouchableOpacity onPress={toggleSearch} style={styles.searchIcon}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={theme.colors.text.secondary}
              />
            </TouchableOpacity>

            <View style={styles.searchBarWrapper}>
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Tìm kiếm địa điểm..."
                placeholderTextColor={theme.colors.text.secondary}
                style={[
                  styles.input,
                  {
                    color: theme.colors.text.primary,
                    backgroundColor: theme.colors.background.paper,
                    borderColor: theme.colors.divider,
                    ...theme.shadows.sm,
                  },
                ]}
                onSubmitEditing={handleSubmit}
              />
            </View>
          </View>
        )}
      </Animated.View>

      <Animated.View
        style={[
          styles.reloadButton,
          {
            backgroundColor: theme.colors.background.paper,
            top: reloadTop,
            ...theme.shadows.sm,
          },
        ]}
      >
        <TouchableOpacity onPress={onRefresh}>
          <Ionicons name="reload" size={24} color={theme.colors.primary.main} />
        </TouchableOpacity>
      </Animated.View>

      <RandomRecipeButton regions={regions} onRandomSelect={onRandomSelect} />
    </>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    top: 20,
    left: 16,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    zIndex: 1,
  },
  searchIcon: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarWrapper: {
    flex: 1,
    paddingRight: 16,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    paddingVertical: 8,
  },
  reloadButton: {
    position: 'absolute',
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
