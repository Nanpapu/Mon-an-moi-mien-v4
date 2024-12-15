// Component hiển thị thông tin chi tiết của một công thức nấu ăn
// Bao gồm hình ảnh, tên món, vùng miền, nguyên liệu và cách làm
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { Recipe, Review } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { ReviewService } from "../../services/reviewService";
import { Ionicons } from "@expo/vector-icons";
import { ReviewModal, ReviewsList } from "../reviews";
import { styles } from "./RecipeCard.styles";

// Props của component
interface Props {
  recipe: Recipe; // Thông tin công thức
  onSave?: () => void; // Hàm xử lý khi nhấn nút lưu
  onDelete?: () => void; // Hàm xử lý khi nhấn nút xóa
  showActions?: boolean; // Hiển thị các nút tương tác hay không
  showReviews?: boolean; // Hiển thị phần đánh giá hay không
}

export function RecipeCard({
  recipe,
  onSave,
  onDelete,
  showActions = true,
  showReviews = false,
}: Props) {
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [stats, setStats] = useState({ averageRating: 0, totalReviews: 0 });
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [existingReview, setExistingReview] = useState<any>(null);
  const [showReviewsList, setShowReviewsList] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [allReviews, setAllReviews] = useState<Review[]>([]);

  // Load thông tin đánh giá nếu showReviews = true
  useEffect(() => {
    if (showReviews) {
      loadReviewStats();
    }
  }, [showReviews]);

  const loadReviewStats = async () => {
    setIsLoadingStats(true);
    try {
      const recipeStats = await ReviewService.getRecipeStats(recipe.id);
      setStats(recipeStats);
    } catch (error) {
      console.error("Lỗi khi tải thống kê đánh giá:", error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  // RENDER
  return (
    <View style={styles.card}>
      {/* Phần hình ảnh món ăn */}
      <Image
        source={recipe.image}
        style={styles.image}
        contentFit="cover"
        transition={1000}
      />

      {/* Phần thông tin chi tiết */}
      <View style={styles.content}>
        {/* Header luôn hiển thị */}
        <View
          style={[
            styles.header,
            showDetails && {
              borderBottomWidth: 1,
              borderBottomColor: "#e1e1e1",
            },
          ]}
        >
          <View>
            <Text style={styles.name}>{recipe.name}</Text>
            <Text style={styles.region}>Vùng miền: {recipe.region}</Text>
          </View>

          <TouchableOpacity
            style={styles.expandButton}
            onPress={() => setShowDetails(!showDetails)}
          >
            <Ionicons
              name={showDetails ? "chevron-up" : "chevron-down"}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        {/* Phần chi tiết có thể ẩn/hiện */}
        {showDetails && (
          <View style={styles.details}>
            <Text style={styles.sectionTitle}>Nguyên liệu:</Text>
            {recipe.ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.listItem}>
                • {ingredient}
              </Text>
            ))}

            <Text style={styles.sectionTitle}>Cách làm:</Text>
            {recipe.instructions.map((instruction, index) => (
              <Text key={index} style={styles.listItem}>
                {index + 1}. {instruction}
              </Text>
            ))}
          </View>
        )}
        {/* Di chuyển phần actions ra ngoài */}
        {showActions && (
          <View style={styles.actions}>
            {onSave && (
              <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                <Text style={styles.buttonText}>Lưu công thức</Text>
              </TouchableOpacity>
            )}
            {onDelete && (
              <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                <Text style={styles.buttonText}>Xóa công thức</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        {showReviews && (
          <View style={styles.ratingContainer}>
            <View style={styles.ratingHeader}>
              <View style={styles.ratingScore}>
                {!isLoadingStats && (stats.totalReviews > 0) ? (
                  <>
                    <Text style={styles.averageRating}>
                      {stats.averageRating.toFixed(1)}
                    </Text>
                    <View style={styles.starsRow}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Ionicons
                          key={star}
                          name={star <= stats.averageRating ? "star" : "star-outline"}
                          size={16}
                          color="#FFD700"
                        />
                      ))}
                    </View>
                    <Text style={styles.totalReviews}>
                      {stats.totalReviews} đánh giá
                    </Text>
                  </>
                ) : isLoadingStats ? (
                  <ActivityIndicator size="small" color="#007AFF" />
                ) : (
                  <Text style={styles.noReviews}>Chưa có đánh giá</Text>
                )}
              </View>

              {user && (
                <TouchableOpacity
                  style={styles.addReviewButton}
                  onPress={() => setModalVisible(true)}
                >
                  <Ionicons
                    name={existingReview ? "create" : "add"}
                    size={20}
                    color="white"
                  />
                  <Text style={styles.addReviewText}>
                    {existingReview ? "Sửa đánh giá" : "Đánh giá"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={() => setShowReviewsList(true)}
            >
              <Text style={styles.viewAllText}>Xem tất cả đánh giá</Text>
              <Ionicons name="chevron-forward" size={20} color="#007AFF" />
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
        transparent
        animationType="slide"
        onRequestClose={() => setShowReviewsList(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { flex: 1 }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Đánh giá</Text>
              <TouchableOpacity
                onPress={() => setShowReviewsList(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1 }}>
              <ReviewsList
                reviews={allReviews}
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
