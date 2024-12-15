import React from 'react';
import { View, Text, Image } from 'react-native';
import { Review } from '../../types';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './ReviewsList.styles';

interface ReviewsListProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export const ReviewsList = ({ reviews, averageRating, totalReviews }: ReviewsListProps) => {
  if (reviews.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="chatbubble-outline" size={64} color="#ccc" />
        <Text style={styles.emptyTitle}>Chưa có đánh giá nào</Text>
        <Text style={styles.emptyText}>
          Hãy là người đầu tiên đánh giá món ăn này!
        </Text>
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
      />
    ));
  };

  return (
    <View style={styles.container}>
      {reviews.map((review) => (
        <View key={review.id} style={styles.reviewItem}>
          <View style={styles.userInfo}>
            {review.userInfo?.photoURL ? (
              <Image 
                source={{ uri: review.userInfo.photoURL }} 
                style={styles.avatar} 
              />
            ) : (
              <Ionicons name="person-circle" size={40} color="#007AFF" />
            )}
            <View style={styles.userDetails}>
              <Text style={styles.userName}>
                {review.userInfo?.displayName || "Người dùng"}
              </Text>
              <Text style={styles.userEmail}>{review.userInfo?.email}</Text>
            </View>
          </View>
          
          <View style={styles.ratingContainer}>
            {renderStars(review.rating)}
            <Text style={styles.date}>
              {new Date(review.createdAt.toDate()).toLocaleDateString()}
            </Text>
          </View>
          
          <Text style={styles.comment}>{review.comment}</Text>
        </View>
      ))}
    </View>
  );
};
