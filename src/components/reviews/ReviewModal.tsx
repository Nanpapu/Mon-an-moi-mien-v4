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
import { createStyles } from "./ReviewModal.styles";
import { useTheme } from "../../theme/ThemeContext";
import { Typography, Button, Input } from "../shared";

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
  const { theme } = useTheme();
  const styles = createStyles(theme);
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
    <Modal
      visible={visible}
      onRequestClose={onClose}
      style={{ margin: theme.spacing.lg }}
    >
      <View style={{ padding: theme.spacing.lg }}>
        <Typography variant="h3" style={{ marginBottom: theme.spacing.md }}>
          {existingReview ? "Chỉnh sửa đánh giá" : "Đánh giá món ăn"}
        </Typography>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: theme.spacing.lg,
          }}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              style={{ padding: theme.spacing.xs }}
            >
              <Ionicons
                name={star <= rating ? "star" : "star-outline"}
                size={32}
                color={theme.colors.warning.main}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Input
          value={comment}
          onChangeText={setComment}
          placeholder="Nhập nhận xét của bạn..."
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          containerStyle={{ marginBottom: theme.spacing.lg }}
        />

        <Button
          variant="primary"
          onPress={handleSubmit}
          disabled={isSubmitting}
          style={{ width: "100%" }}
        >
          {isSubmitting ? "Đang xử lý..." : "Gửi đánh giá"}
        </Button>
      </View>
    </Modal>
  );
};
