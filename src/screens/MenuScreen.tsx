// Component màn hình Menu chính
// Hiển thị danh sách các công thức đã lưu và cho phép tìm kiếm, lọc theo vùng miền
import React, { useState, useMemo, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import { Recipe } from "../types";
import { getSavedRecipes, removeRecipe } from "../utils/storage";
import { useRecipes } from "../context/RecipeContext";
import { SearchBar } from "../components/SearchBar";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RecipeCardSkeleton } from "../components/RecipeCardSkeleton";
import { RecipeCard } from "../components/RecipeCard";

export default function MenuScreen() {
  // HOOKS & STATE
  // Lấy danh sách công thức đã lưu và hàm refresh từ context
  const { savedRecipes, refreshSavedRecipes } = useRecipes();

  // State quản lý từ khóa tìm kiếm và vùng miền được chọn
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Thêm vào phần khai báo state
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // COMPUTED VALUES
  // Lọc công thức theo điều kiện tìm kiếm và vùng miền
  const filteredRecipes = useMemo(() => {
    return savedRecipes.filter((recipe) => {
      // Kiểm tra khớp với từ khóa tìm kiếm (tên món hoặc nguyên liệu)
      const matchesSearch =
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some((i) =>
          i.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Kiểm tra khớp với vùng miền đã chọn
      const matchesRegion = !selectedRegion || recipe.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [savedRecipes, searchQuery, selectedRegion]);

  // Lấy danh sách các vùng miền duy nhất từ công thức đã lưu
  const regions = useMemo(() => {
    return Array.from(new Set(savedRecipes.map((r) => r.region)));
  }, [savedRecipes]);

  // HANDLERS
  // Xử lý xóa công thức
  const handleDeleteRecipe = async (recipe: Recipe) => {
    Alert.alert(
      "Xác nhận xóa",
      `Bạn có chắc muốn xóa công thức "${recipe.name}" không?`,
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            const success = await removeRecipe(recipe.id);
            if (success) {
              await refreshSavedRecipes();
              Alert.alert("Thành công", "Đã xóa công thức");
            }
          },
        },
      ]
    );
  };

  // Thêm useEffect để giả lập loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await refreshSavedRecipes();
      setIsLoading(false);
    };
    loadData();
  }, []);

  // RENDER
  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Tìm theo tên món hoặc nguyên liệu..."
      />

      {/* Thanh lọc theo vùng miền */}
      <ScrollView
        horizontal
        style={styles.filterContainer}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={[
            styles.filterButton,
            !selectedRegion && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedRegion(null)}
        >
          <Text style={styles.filterText}>Tất cả</Text>
        </TouchableOpacity>
        {regions.map((region) => (
          <TouchableOpacity
            key={region}
            style={[
              styles.filterButton,
              selectedRegion === region && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedRegion(region)}
          >
            <Text style={styles.filterText}>{region}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Danh sách công thức */}
      <ScrollView
        style={styles.recipeList}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshSavedRecipes}
            colors={["#007AFF"]}
            tintColor="#007AFF"
          />
        }
      >
        {/* Hiển thị thông báo khi chưa có công thức hoặc không tìm thấy kết quả */}
        {isLoading ? (
          // Hiển thị 3 skeleton cards khi đang loading
          <>
            <RecipeCardSkeleton />
            <RecipeCardSkeleton />
            <RecipeCardSkeleton />
          </>
        ) : filteredRecipes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {savedRecipes.length === 0
                ? "Bạn chưa lưu công thức nào.\nHãy khám phá các món ăn trong phần Bản đồ!"
                : "Không tìm thấy công thức phù hợp với điều kiện lọc."}
            </Text>
          </View>
        ) : (
          // Hiển thị danh sách công thức đã được lọc
          filteredRecipes.map((recipe) => (
            <View key={recipe.id} style={styles.recipeCard}>
              <RecipeCard
                recipe={recipe}
                onDelete={() => handleDeleteRecipe(recipe)}
                showActions={true}
                showReviews={true}
              />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

// STYLES
const styles = StyleSheet.create({
  // Container chính
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Styles cho phần lọc
  filterContainer: {
    paddingHorizontal: 10,
    marginBottom: 15,
    maxHeight: 50, // Thêm chiều cao tối đa
    minHeight: 50, // Thêm chiều cao tối thiểu
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
    alignSelf: "center", // Căn giữa button theo chiều dọc
  },
  filterButtonActive: {
    backgroundColor: "#007AFF",
  },
  filterText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "bold",
  },

  // Styles cho danh sách công thức
  recipeList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },

  // Styles cho thẻ công thức
  recipeCard: {
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: "hidden",
  },

  recipeImage: {
    width: "100%",
    height: 200,
  },

  recipeInfo: {
    padding: 15,
  },

  recipeName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },

  regionBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: "flex-start",
    marginBottom: 15,
  },

  regionName: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 10,
    color: "#444",
  },

  ingredientsList: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
  },

  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  instructionsList: {
    marginTop: 5,
  },

  instructionItem: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "flex-start",
  },

  stepNumber: {
    backgroundColor: "#007AFF",
    color: "white",
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: "center",
    lineHeight: 24,
    marginRight: 10,
    fontSize: 14,
    fontWeight: "bold",
  },

  instructionText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: "#444",
  },

  listItem: {
    fontSize: 14,
    marginBottom: 5,
    color: "#666",
  },

  deleteButton: {
    backgroundColor: "#ff4444",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },

  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
});
