// Component hiển thị thông tin chi tiết của một công thức nấu ăn
// Bao gồm hình ảnh, tên món, vùng miền, nguyên liệu và cách làm
import React, { useEffect, useState } from 'react';
import {
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { Recipe, Review } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { ReviewService } from '../../services/reviewService';
import { Ionicons } from '@expo/vector-icons';
import { ReviewModal, ReviewsList } from '../reviews';
import { createStyles } from './RecipeCard.styles';
import { useTheme } from '../../theme/ThemeContext';
import { Typography } from '../shared';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { COLLECTIONS } from '../../constants';

interface Props {
  recipe: Recipe;
  onSave?: () => void;
  onDelete?: (recipe: Recipe) => void;
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
  const styles = createStyles(theme);
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [stats, setStats] = useState({ averageRating: 0, totalReviews: 0 });
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [existingReview, setExistingReview] = useState<any>(null);
  const [showReviewsList, setShowReviewsList] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [allReviews, setAllReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (showReviews) {
      setIsLoadingStats(true);

      const unsubscribe = onSnapshot(
        doc(db, COLLECTIONS.RECIPE_STATS, recipe.id),
        (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            setStats({
              averageRating: data.averageRating || 0,
              totalReviews: data.totalReviews || 0,
            });
          }
          setIsLoadingStats(false);
        },
        (error) => {
          console.error('Lỗi khi lắng nghe thay đổi stats:', error);
          setIsLoadingStats(false);
        }
      );

      // Cleanup subscription
      return () => {
        unsubscribe();
        setIsLoadingStats(false);
      };
    }
  }, [showReviews, recipe.id]);

  useEffect(() => {
    if (user && showReviews) {
      const loadUserReview = async () => {
        const review = await ReviewService.getUserReviewForRecipe(
          recipe.id,
          user.uid
        );
        setExistingReview(review);
      };
      loadUserReview();
    }
  }, [user, showReviews]);

  // const loadReviewStats = async () => {
  //   setIsLoadingStats(true);
  //   try {
  //     const recipeStats = await ReviewService.getRecipeStats(recipe.id);
  //     setStats(recipeStats);
  //   } catch (error) {
  //     console.error("Lỗi khi tải thống kê đánh giá:", error);
  //   } finally {
  //     setIsLoadingStats(false);
  //   }
  // };

  const loadReviews = async () => {
    try {
      const reviewsList = await ReviewService.getRecipeReviews(recipe.id);
      setAllReviews(reviewsList);
    } catch (error) {
      console.error('Lỗi khi tải đánh giá:', error);
    }
  };

  return (
    <View style={styles.card}>
      <Image
        source={recipe.image}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Typography variant="h3" style={styles.name}>
              {recipe.name}
            </Typography>
            <Typography variant="body2" style={styles.region}>
              {recipe.region}
            </Typography>
          </View>

          <TouchableOpacity
            style={[
              styles.expandButton,
              showDetails && styles.expandButtonRotate,
            ]}
            onPress={() => setShowDetails(!showDetails)}
          >
            <Ionicons
              name="chevron-up"
              size={24}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>
        </View>

        {showDetails && (
          <View style={styles.details}>
            <Typography variant="subtitle1">Nguyên liệu:</Typography>
            {recipe.ingredients.map((ingredient, index) => (
              <Typography
                key={index}
                variant="body2"
                color="secondary"
                style={styles.listItem}
              >
                • {ingredient}
              </Typography>
            ))}

            <Typography
              variant="subtitle1"
              style={{ marginTop: theme.spacing.md }}
            >
              Cách làm:
            </Typography>
            {recipe.instructions.map((instruction, index) => (
              <Typography
                key={index}
                variant="body2"
                color="secondary"
                style={styles.listItem}
              >
                {index + 1}. {instruction}
              </Typography>
            ))}
          </View>
        )}

        {showActions && (
          <View style={styles.actions}>
            {onSave && (
              <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                <Ionicons
                  name="bookmark-outline"
                  size={20}
                  color={theme.colors.background.default}
                />
                <Typography
                  variant="body1"
                  style={{ color: theme.colors.background.default }}
                >
                  Lưu công thức
                </Typography>
              </TouchableOpacity>
            )}
            {onDelete && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  if (onDelete) {
                    onDelete(recipe);
                  }
                }}
              >
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color={theme.colors.background.default}
                />
                <Typography
                  variant="body1"
                  style={{ color: theme.colors.background.default }}
                >
                  Xóa công thức
                </Typography>
              </TouchableOpacity>
            )}
          </View>
        )}

        {showReviews && (
          <View style={styles.ratingContainer}>
            <View style={styles.ratingHeader}>
              <View style={styles.ratingScore}>
                {!isLoadingStats && stats.totalReviews > 0 ? (
                  <>
                    <Typography variant="h2" style={styles.averageRating}>
                      {stats.averageRating.toFixed(1)}
                    </Typography>
                    <View style={styles.starsRow}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Ionicons
                          key={star}
                          name={
                            star <= stats.averageRating
                              ? 'star'
                              : 'star-outline'
                          }
                          size={16}
                          color="#FFD700"
                        />
                      ))}
                    </View>
                    <Typography variant="caption" color="secondary">
                      {stats.totalReviews} đánh giá
                    </Typography>
                  </>
                ) : isLoadingStats ? (
                  <ActivityIndicator
                    size="small"
                    color={theme.colors.primary.main}
                  />
                ) : (
                  <View style={styles.noReviewsContainer}>
                    <Ionicons
                      name="star-outline"
                      size={24}
                      color={theme.colors.text.secondary}
                    />
                    <Typography variant="body2" style={styles.noReviews}>
                      Chưa có đánh giá
                    </Typography>
                  </View>
                )}
              </View>

              {user && (
                <TouchableOpacity
                  style={styles.addReviewButton}
                  onPress={() => setModalVisible(true)}
                >
                  <Ionicons
                    name={existingReview ? 'create' : 'add'}
                    size={20}
                    color={theme.colors.primary.contrast}
                  />
                  <Typography
                    variant="body1"
                    style={{ color: theme.colors.primary.contrast }}
                  >
                    {existingReview ? 'Sửa đánh giá' : 'Đánh giá'}
                  </Typography>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={() => {
                loadReviews();
                setShowReviewsList(true);
              }}
            >
              <Typography variant="body1" style={styles.viewAllText}>
                Xem tất cả {stats.totalReviews} đánh giá
              </Typography>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={theme.colors.primary.main}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {showReviews && user && (
        <ReviewModal
          visible={modalVisible}
          recipeId={recipe.id}
          userId={user.uid}
          existingReview={existingReview}
          onClose={() => setModalVisible(false)}
          onSubmit={async () => {
            const recipeStats = await ReviewService.getRecipeStats(recipe.id);
            setStats(recipeStats);
            if (user) {
              const review = await ReviewService.getUserReviewForRecipe(
                recipe.id,
                user.uid
              );
              setExistingReview(review);
            }
            setModalVisible(false);
          }}
        />
      )}

      <Modal
        visible={showReviewsList}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowReviewsList(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { height: '60%' }]}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderBackground}>
                <Typography variant="h3" style={styles.modalTitle}>
                  Đánh giá
                </Typography>
                <TouchableOpacity
                  onPress={() => setShowReviewsList(false)}
                  style={styles.closeButton}
                >
                  <Ionicons
                    name="close"
                    size={24}
                    color={theme.colors.text.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView style={styles.modalBody}>
              <ReviewsList
                reviews={allReviews}
                recipeId={recipe.id}
                averageRating={stats.averageRating}
                totalReviews={stats.totalReviews}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
