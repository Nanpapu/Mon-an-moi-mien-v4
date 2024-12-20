import React, { useState } from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input, Typography } from '../shared';
import { useTheme } from '../../theme/ThemeContext';
import { useToast } from '../../hooks/useToast';
import { ReviewService } from '../../services/reviewService';

interface Props {
  visible: boolean;
  recipeId: string;
  userId: string;
  existingReview?: any;
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
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async () => {
    if (rating === 0) {
      showToast('warning', 'Vui lòng chọn số sao');
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
        showToast('success', 'Đã cập nhật đánh giá');
      } else {
        await ReviewService.createReview(recipeId, userId, rating, comment);
        showToast('success', 'Đã thêm đánh giá');
      }
      onSubmit();
      onClose();
    } catch (error: any) {
      showToast('error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: theme.spacing.lg,
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.background.paper,
            borderRadius: theme.spacing.lg,
            padding: theme.spacing.lg,
            ...theme.shadows.lg,
          }}
        >
          {/* Header với nút back */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: theme.spacing.md,
            }}
          >
            <TouchableOpacity
              onPress={onClose}
              style={{ padding: theme.spacing.sm }}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={theme.colors.text.primary}
              />
            </TouchableOpacity>
            <Typography
              variant="h3"
              style={{ flex: 1, marginLeft: theme.spacing.sm }}
            >
              {existingReview ? 'Chỉnh sửa đánh giá' : 'Đánh giá món ăn'}
            </Typography>
          </View>

          {/* Star rating */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
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
                  name={star <= rating ? 'star' : 'star-outline'}
                  size={32}
                  color={theme.colors.warning.main}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Comment input */}
          <Input
            value={comment}
            onChangeText={setComment}
            placeholder="Nhập nhận xét của bạn..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            containerStyle={{ marginBottom: theme.spacing.lg }}
          />

          {/* Submit button */}
          <Button
            variant="primary"
            onPress={handleSubmit}
            disabled={isSubmitting}
            style={{ width: '100%' }}
          >
            {isSubmitting ? 'Đang xử lý...' : 'Gửi đánh giá'}
          </Button>
        </View>
      </View>
    </Modal>
  );
};
