import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ReviewService } from "../../services/reviewService";
import { styles } from './ReviewModal.styles';

interface Props {
  visible: boolean;
  recipeId: string;
  userId: string;
  existingReview?: {
    id: string;
    rating: number;
    comment: string;
  };
  onClose: () => void;
  onSubmit: () => void;
}

export const ReviewModal = ({
  visible,
  recipeId,
  userId,
  existingReview,
  onClose,
  onSubmit,
}: Props) => {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert("Lỗi", "Vui lòng chọn số sao");
      return;
    }

    try {
      setIsSubmitting(true);
      if (existingReview) {
        await ReviewService.updateReview(
          existingReview.id,
          recipeId,
          rating,
          comment
        );
      } else {
        await ReviewService.createReview(recipeId, userId, rating, comment);
      }
      onSubmit();
      onClose();
    } catch (error: any) {
      Alert.alert("Lỗi", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>

          <Text style={styles.title}>
            {existingReview ? "Sửa đánh giá" : "Đánh giá món ăn"}
          </Text>

          {/* Star Rating */}
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Ionicons
                  name={star <= rating ? "star" : "star-outline"}
                  size={32}
                  color="#FFD700"
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Comment Input */}
          <TextInput
            style={styles.input}
            placeholder="Nhập nhận xét của bạn..."
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitText}>
              {isSubmitting ? "Đang xử lý..." : "Gửi đánh giá"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
