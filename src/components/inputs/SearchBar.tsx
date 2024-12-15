// Component thanh tìm kiếm có icon và input text
// Sử dụng để tìm kiếm món ăn trong ứng dụng
import React from "react";
import { View, TextInput, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

// Props của component
interface Props {
  value: string;                     // Giá trị hiện tại của ô input
  onChangeText: (text: string) => void;  // Hàm xử lý khi text thay đổi
  placeholder?: string;              // Placeholder cho ô input
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Tìm kiếm món ăn...",
}: Props) {
  // RENDER
  return (
    <View style={styles.container}>
      {/* Icon tìm kiếm */}
      <Ionicons name="search" size={20} color={styles.searchIcon.color} />
      
      {/* Ô input */}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={styles.input.color}
      />
    </View>
  );
}

// STYLES
const styles = StyleSheet.create({
  // Container chứa icon và input
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.paper,
    borderRadius: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    margin: spacing.md,
    shadowColor: colors.text.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  // Style cho ô input
  input: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 16,
    color: colors.text.primary,
  },

  searchIcon: {
    color: colors.text.secondary,
  }
});