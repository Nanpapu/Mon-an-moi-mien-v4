// Component hiển thị thông tin chi tiết của một công thức nấu ăn
// Bao gồm hình ảnh, tên món, vùng miền, nguyên liệu và cách làm
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
  showActions = true,
  showReviews = false,
}: Props) {
  const { theme } = useTheme();

  return (
    <Card style={styles.container}>
      <Image
        source={{ uri: recipe.image }}
        style={styles.image}
        resizeMode="cover"
      />
      
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

        <Typography variant="body1" numberOfLines={3}>
          {recipe.description}
        </Typography>

        {showActions && (
          <View style={styles.actions}>
            {onSave && (
              <Button
                variant="primary"
                icon="bookmark-outline"
                onPress={onSave}
                style={{ flex: 1, marginRight: theme.spacing.sm }}
              >
                Lưu công thức
              </Button>
            )}
            {onDelete && (
              <Button
                variant="secondary"
                icon="trash-outline"
                onPress={onDelete}
                style={{ flex: 1 }}
              >
                Xóa công thức
              </Button>
            )}
          </View>
        )}

        {showReviews && (
          <View style={styles.reviews}>
            <View style={styles.rating}>
              <Ionicons name="star" size={20} color="#FFD700" />
              <Typography variant="h3" style={{ marginLeft: 4 }}>
                {recipe.rating?.toFixed(1) || "N/A"}
              </Typography>
            </View>
            <Typography variant="body2" color="secondary">
              ({recipe.numReviews || 0} đánh giá)
            </Typography>
          </View>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 16,
  },
  reviews: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
