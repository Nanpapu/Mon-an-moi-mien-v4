import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Review } from '../types';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
};

export const ReviewsList = ({ reviews, averageRating, totalReviews }: Props) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.statsContainer}>
        <Text style={styles.averageRating}>{averageRating.toFixed(1)}</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name={star <= averageRating ? "star" : "star-outline"}
              size={20}
              color="#FFD700"
            />
          ))}
        </View>
        <Text style={styles.totalReviews}>{totalReviews} đánh giá</Text>
      </View>

      {reviews.map((review) => (
        <View key={review.id} style={styles.reviewItem}>
          <View style={styles.reviewHeader}>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= review.rating ? "star" : "star-outline"}
                  size={16}
                  color="#FFD700"
                />
              ))}
            </View>
            <Text style={styles.reviewDate}>
              {review.createdAt.toDate().toLocaleDateString()}
            </Text>
          </View>
          <Text style={styles.reviewComment}>{review.comment}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  statsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  averageRating: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
    marginVertical: 4,
  },
  totalReviews: {
    color: '#666',
  },
  reviewItem: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewDate: {
    color: '#666',
    fontSize: 12,
  },
  reviewComment: {
    fontSize: 14,
    lineHeight: 20,
  },
});
