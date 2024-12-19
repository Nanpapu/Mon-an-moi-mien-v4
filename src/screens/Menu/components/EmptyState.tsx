import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Typography } from '../../../components/shared';
import { useTheme } from '../../../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  hasRecipes: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
}

export const EmptyState = ({ hasRecipes, isRefreshing = false, onRefresh }: Props) => {
  const { theme } = useTheme();

  const EmptyContent = () => (
    <View style={{ 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: theme.spacing.xl,
      minHeight: 400 // Đảm bảo có đủ không gian để scroll
    }}>
      <Ionicons
        name={hasRecipes ? "search" : "book-outline"}
        size={64}
        color={theme.colors.text.secondary}
        style={{ marginBottom: theme.spacing.md }}
      />
      <Typography
        variant="subtitle1"
        color="secondary"
        align="center"
      >
        {hasRecipes
          ? "Không tìm thấy công thức phù hợp với điều kiện lọc."
          : "Bạn chưa lưu công thức nào.\nHãy khám phá các món ăn trong phần Bản đồ!"}
      </Typography>
    </View>
  );

  // Nếu có onRefresh, wrap content trong ScrollView với RefreshControl
  if (onRefresh) {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <EmptyContent />
      </ScrollView>
    );
  }

  // Nếu không có onRefresh, render content bình thường
  return <EmptyContent />;
};
