// Component thanh tìm kiếm có icon và input text
// Sử dụng để tìm kiếm món ăn trong ứng dụng
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
      <Ionicons name="search" size={20} color="#666" />
      
      {/* Ô input */}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#666"
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
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 10,
  },

  // Style cho ô input
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
});