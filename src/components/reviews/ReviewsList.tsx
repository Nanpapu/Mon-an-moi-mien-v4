import React from 'react';
import { View, Image } from 'react-native';
import { Typography } from '../shared';
import { useTheme } from '../../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface ReviewsListProps {
  reviews: any[];
  averageRating?: number;
  totalReviews?: number;
}

export const ReviewsList = ({ reviews, averageRating, totalReviews }: ReviewsListProps) => {
  const { theme } = useTheme();

  if (reviews.length === 0) {
    return (
      <View style={{ 
        alignItems: 'center', 
        padding: theme.spacing.xl 
      }}>
        <Ionicons 
          name="chatbubble-outline" 
          size={64} 
          color={theme.colors.text.secondary} 
        />
        <Typography 
          variant="subtitle1" 
          style={{ marginTop: theme.spacing.md }}
        >
          Chưa có đánh giá nào
        </Typography>
        <Typography 
          variant="body2" 
          color="secondary"
          style={{ marginTop: theme.spacing.sm }}
        >
          Hãy là người đầu tiên đánh giá món ăn này!
        </Typography>
      </View>
    );
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? "star" : "star-outline"}
        size={16}
        color="#FFD700"
        style={{ marginRight: 2 }}
      />
    ));
  };

  return (
    <View style={{ flex: 1 }}>
      {reviews.map((review) => (
        <View 
          key={review.id} 
          style={{
            padding: theme.spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.divider,
          }}
        >
          <View style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: theme.spacing.sm 
          }}>
            {review.userInfo?.photoURL ? (
              <Image 
                source={{ uri: review.userInfo.photoURL }} 
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginRight: theme.spacing.sm
                }} 
              />
            ) : (
              <Ionicons 
                name="person-circle" 
                size={40} 
                color={theme.colors.primary.main}
                style={{ marginRight: theme.spacing.sm }}
              />
            )}
            <View>
              <Typography variant="subtitle2">
                {review.userInfo?.displayName || "Người dùng"}
              </Typography>
              <Typography 
                variant="caption" 
                color="secondary"
              >
                {review.userInfo?.email}
              </Typography>
            </View>
          </View>
          
          <View style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: theme.spacing.sm 
          }}>
            <View style={{ flexDirection: 'row' }}>
              {renderStars(review.rating)}
            </View>
            <Typography 
              variant="caption" 
              color="secondary"
              style={{ marginLeft: theme.spacing.md }}
            >
              {new Date(review.createdAt.toDate()).toLocaleDateString()}
            </Typography>
          </View>
          
          <Typography variant="body2">
            {review.comment}
          </Typography>
        </View>
      ))}
    </View>
  );
};
