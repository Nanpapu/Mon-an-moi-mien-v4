import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
  onSubmitEditing?: () => void; 
}

export const SearchBar = ({ 
  value, 
  onChangeText, 
  onClear,
  placeholder = "Tìm kiếm..." 
}: Props) => {
  const { theme } = useTheme();

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: theme.colors.background.paper,
        borderColor: theme.colors.divider,
        ...theme.shadows.sm
      }
    ]}>
      <Ionicons 
        name="search" 
        size={20} 
        color={theme.colors.text.secondary}
        style={{ marginRight: theme.spacing.sm }}
      />
      
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.secondary}
        style={[
          styles.input,
          { color: theme.colors.text.primary }
        ]}
      />

      {value.length > 0 && onClear && (
        <TouchableOpacity onPress={onClear}>
          <Ionicons 
            name="close-circle" 
            size={20} 
            color={theme.colors.text.secondary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
}); 