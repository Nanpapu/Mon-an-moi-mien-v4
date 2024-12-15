// Component hiển thị thông tin chi tiết của một công thức nấu ăn
// Bao gồm hình ảnh, tên món, vùng miền, nguyên liệu và cách làm
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Image } from "expo-image";
import { Recipe, Review } from "../types";
import { useAuth } from "../context/AuthContext";
import { ReviewService } from "../services/reviewService";
import { Ionicons } from "@expo/vector-icons";
import { ReviewModal, ReviewsList } from "./reviews";

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
  const [existingReview, setExistingReview] = useState<any>(null);
  const [showReviewsList, setShowReviewsList] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [allReviews, setAllReviews] = useState<Review[]>([]);

  // Load thông tin đánh giá nếu showReviews = true
  useEffect(() => {
    if (showReviews) {
      const loadReviewData = async () => {
        const recipeStats = await ReviewService.getRecipeStats(recipe.id);
        const reviews = await ReviewService.getRecipeReviews(recipe.id);
        setStats(recipeStats);
        setAllReviews(reviews);
        if (user) {
          const review = await ReviewService.getUserReviewForRecipe(
            recipe.id,
            user.uid
          );
          setExistingReview(review);
        }
      };
      loadReviewData();
    }
  }, [recipe.id, user, showReviews]);

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
                <Text style={styles.averageRating}>
                  {stats.averageRating.toFixed(1)}
                </Text>
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name={
                        star <= stats.averageRating ? "star" : "star-outline"
                      }
                      size={16}
                      color="#FFD700"
                    />
                  ))}
                </View>
                <Text style={styles.totalReviews}>
                  {stats.totalReviews} đánh giá
                </Text>
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
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Đánh giá</Text>
              <TouchableOpacity
                onPress={() => setShowReviewsList(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <ReviewsList
              reviews={allReviews}
              averageRating={stats.averageRating}
              totalReviews={stats.totalReviews}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

// STYLES
const styles = StyleSheet.create({
  // Style cho card chứa toàn bộ thông tin
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Style cho phần hình ảnh
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  // Style cho phần nội dung
  content: {
    padding: 16,
  },

  // Style cho header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 4,
  },

  region: {
    fontSize: 15,
    color: "#666",
    fontWeight: "500",
  },

  expandButton: {
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
  },

  // Style cho phần chi tiết
  details: {
    marginTop: 16,
    paddingTop: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
    marginTop: 16,
  },

  listItem: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    marginBottom: 8,
    paddingLeft: 8,
  },

  // Style cho phần nút tương tác
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },

  saveButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#f44336",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },

  ratingContainer: {
    marginTop: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 15,
  },

  ratingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  ratingScore: {
    alignItems: "center",
  },

  averageRating: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
  },

  starsRow: {
    flexDirection: "row",
    gap: 2,
    marginVertical: 4,
  },

  totalReviews: {
    fontSize: 12,
    color: "#666",
  },

  addReviewButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },

  addReviewText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },

  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
    marginTop: 4,
  },

  viewAllText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },

  closeButton: {
    padding: 4,
  },
});
