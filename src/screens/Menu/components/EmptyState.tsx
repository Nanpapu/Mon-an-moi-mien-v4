import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../components/shared';
import { useTheme } from '../../../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  hasRecipes: boolean;
}

export const EmptyState = ({ hasRecipes }: Props) => {
  const { theme } = useTheme();

  return (
    <View style={{ 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: theme.spacing.xl 
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
};
