// Component hiển thị thông tin chi tiết của một công thức nấu ăn
// Bao gồm hình ảnh, tên món, vùng miền, nguyên liệu và cách làm
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Typography, Button } from '../shared';
import { useTheme } from '../../theme/ThemeContext';
import { Recipe } from '../../types';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  recipe: Recipe;
  onSave?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
  showReviews?: boolean;
}

export function RecipeCard({
  recipe,
  onSave,
  onDelete,
  showActions = false,
  showReviews = false,
}: Props) {
  const { theme } = useTheme();

  return (
    <Card style={{ marginBottom: theme.spacing.md }}>
      {recipe.imageUrl && (
        <Image
          source={{ uri: recipe.imageUrl }}
          style={{
            width: '100%',
            height: 200,
            borderTopLeftRadius: theme.spacing.sm,
            borderTopRightRadius: theme.spacing.sm,
          }}
          resizeMode="cover"
        />
      )}

      <View style={{ padding: theme.spacing.md }}>
        <Typography variant="h3" style={{ marginBottom: theme.spacing.xs }}>
          {recipe.name}
        </Typography>

        <Typography 
          variant="body2" 
          color="secondary"
          style={{ marginBottom: theme.spacing.sm }}
        >
          {recipe.region}
        </Typography>

        {showReviews && (
          <View style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: theme.spacing.sm 
          }}>
            {[1, 2, 3, 4, 5].map((star, index) => (
              <Ionicons
                key={index}
                name={star <= (recipe.rating || 0) ? "star" : "star-outline"}
                size={16}
                color="#FFD700"
                style={{ marginRight: 2 }}
              />
            ))}
            <Typography 
              variant="caption" 
              color="secondary"
              style={{ marginLeft: theme.spacing.xs }}
            >
              ({recipe.totalReviews || 0} đánh giá)
            </Typography>
          </View>
        )}

        <Typography 
          variant="subtitle2" 
          style={{ marginBottom: theme.spacing.xs }}
        >
          Nguyên liệu chính:
        </Typography>
        <Typography 
          variant="body2" 
          color="secondary"
          style={{ marginBottom: theme.spacing.md }}
        >
          {recipe.mainIngredients.join(', ')}
        </Typography>

        {showActions && (
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            {onDelete ? (
              <Button
                variant="secondary"
                icon="trash-outline"
                onPress={onDelete}
              >
                Xóa
              </Button>
            ) : onSave && (
              <Button
                variant="primary"
                icon="bookmark-outline"
                onPress={onSave}
              >
                Lưu
              </Button>
            )}
          </View>
        )}
      </View>
    </Card>
  );
}
