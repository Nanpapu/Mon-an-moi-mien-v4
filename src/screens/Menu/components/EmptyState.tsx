import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

interface Props {
  hasRecipes: boolean;
}

export const EmptyState = ({ hasRecipes }: Props) => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {hasRecipes
          ? "Không tìm thấy công thức phù hợp với điều kiện lọc."
          : "Bạn chưa lưu công thức nào.\nHãy khám phá các món ăn trong phần Bản đồ!"}
      </Text>
    </View>
  );
};
