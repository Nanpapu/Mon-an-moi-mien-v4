import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Review } from '../types';
import { Ionicons } from '@expo/vector-icons';

interface ReviewsListProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export const ReviewsList = ({ reviews, averageRating, totalReviews }: ReviewsListProps) => {
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

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  reviewItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userDetails: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 12,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  comment: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
