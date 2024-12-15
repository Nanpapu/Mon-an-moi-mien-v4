// Component thanh tìm kiếm có icon và input text
// Sử dụng để tìm kiếm món ăn trong ứng dụng
import React from "react";
import { Input } from "../shared";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Tìm kiếm món ăn...",
}: Props) {
  return (
    <Input
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      leftIcon="search"
      containerStyle={{ margin: 16 }}
    />
  );
}