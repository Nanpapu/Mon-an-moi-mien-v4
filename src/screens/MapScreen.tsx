// Component màn hình Bản đồ
// Hiển thị bản đồ với các điểm đánh dấu cho từng vùng miền và công thức của vùng đó
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Animated,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region as MapRegion } from "react-native-maps";
import { Recipe, Region } from "../types";
import { saveRecipe } from "../utils/storage";
import { useRecipes } from "../context/RecipeContext";
import { RecipeCard } from "../components/RecipeCard";
import { RegionService } from "../services/regionService";
import { Ionicons } from "@expo/vector-icons";
import { RandomRecipeButton } from "../components/RandomRecipeButton";

export default function MapScreen({ navigation }: { navigation: any }) {
  // HOOKS & STATE
  const { refreshSavedRecipes } = useRecipes();
  // Danh sách công thức được chọn để hiển thị trong modal
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  // Trạng thái hiển thị modal
  const [modalVisible, setModalVisible] = useState(false);
  // Trạng thái sẵn sàng của bản đồ
  const [isMapReady, setIsMapReady] = useState(false);
  const [region, setRegion] = useState({
    latitude: 16.047079,
    longitude: 108.20623,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });

  // Thêm state để theo dõi mức zoom
  const [currentZoom, setCurrentZoom] = useState(10);

  // Thêm state để theo dõi trạng thái tải dữ liệu
  const [isLoading, setIsLoading] = useState(false);

  // Hàm tính toán zoom level từ latitudeDelta
  const calculateZoom = (latitudeDelta: number) => {
    return Math.round(Math.log(360 / latitudeDelta) / Math.LN2);
  };

  // Hàm kiểm tra xem marker có nên hiển thị không
  const shouldShowMarker = (regionId: string, zoom: number) => {
    // 3 thành phố lớn luôn hiển thị khi zoom > 5
    const majorCities = ["01", "48", "79"]; // Hà Nội, Đà Nẵng, TP.HCM
    if (majorCities.includes(regionId)) {
      return zoom > 2;
    }
    // Các tỉnh khác chỉ hiển thị khi zoom > 7
    return zoom > 3.5;
  };

  // Thêm state và useEffect để load dữ liệu
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    const loadRegions = async () => {
      try {
        setIsLoading(true);
        const data = await RegionService.getAllRegions();
        setRegions(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        Alert.alert("Lỗi", "Không thể tải dữ liệu vùng miền");
      } finally {
        setIsLoading(false);
      }
    };
    loadRegions();
  }, []);

  // EFFECTS
  // Thiết lập timer để đánh dấu bản đồ đã sẵn sàng
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // HANDLERS
  // Xử lý lưu công thức
  const handleSaveRecipe = async (recipe: Recipe) => {
    const success = await saveRecipe(recipe);
    if (success) {
      await refreshSavedRecipes();
      Alert.alert("Thành công", "Đã lưu công thức vào Menu của bạn");
    } else {
      Alert.alert("Thông báo", "Công thức này đã được lưu trước đó");
    }
  };

  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      const data = await RegionService.getAllRegions();
      setRegions(data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      Alert.alert("Lỗi", "Không thể tải dữ liệu vùng miền");
    } finally {
      setIsLoading(false);
    }
  };

  // Thêm ref cho MapView
  const mapRef = useRef<MapView>(null);

  // Thêm hàm xử lý random recipe
  const handleRandomRecipe = (latitude: number, longitude: number, recipes: Recipe[]) => {
    // Di chuyển camera đến vị trí được chọn
    const newRegion: MapRegion = {
      latitude,
      longitude,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    };
    
    mapRef.current?.animateToRegion(newRegion, 1000);
    
    // Đợi animation hoàn tất (1000ms) rồi mới hiển thị modal
    setTimeout(() => {
      setSelectedRecipes(recipes);
      setModalVisible(true);
    }, 1000);
  };

  // Thêm state và useEffect cho animation
  const slideAnim = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    if (modalVisible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 5
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 500,
        duration: 300,
        useNativeDriver: true
      }).start();
    }
  }, [modalVisible]);

  // RENDER
  // Hiển thị thông báo khi không có dữ liệu
  if (!regions || regions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Không có dữ liệu vùng miền</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Bản đồ Google Maps */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        onRegionChange={(newRegion) => {
          setRegion(newRegion);
          setCurrentZoom(calculateZoom(newRegion.latitudeDelta));
        }}
        onMapReady={() => setIsMapReady(true)}
      >
        {/* Các điểm đánh dấu trên bản đồ */}
        {isMapReady &&
          regions.map(
            (region) =>
              shouldShowMarker(region.id, currentZoom) && (
                <Marker
                  key={region.id}
                  coordinate={region.coordinate}
                  title={region.name}
                  onPress={() => {
                    setSelectedRecipes(region.recipes);
                    setModalVisible(true);
                  }}
                />
              )
          )}
      </MapView>

      {/* Loading indicator khi bản đồ chưa sẵn sàng */}
      {!isMapReady && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {/* Modal hiển thị danh sách công thức */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Animated.View 
          style={[
            styles.modalView,
            {
              transform: [{
                translateY: slideAnim
              }]
            }
          ]}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close-circle" size={32} color="#666" />
          </TouchableOpacity>
          <ScrollView style={styles.modalScroll}>
            {selectedRecipes.map((recipe) => (
              <View key={recipe.id} style={styles.recipeCard}>
                <RecipeCard
                  recipe={recipe}
                  onSave={() => handleSaveRecipe(recipe)}
                  showActions={true}
                  showReviews={true}
                />
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      </Modal>

      {/* Nút refresh */}
      <TouchableOpacity 
        style={styles.refreshButton}
        onPress={handleRefresh}
      >
        <Ionicons name="refresh" size={24} color="#007AFF" />
      </TouchableOpacity>

      {/* Loading overlay */}
      {isLoading && (
        <View style={[styles.loadingOverlay, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
        </View>
      )}

      {/* Thêm RandomRecipeButton */}
      <RandomRecipeButton 
        regions={regions} 
        onRandomSelect={handleRandomRecipe}
      />
    </View>
  );
}

// STYLES
const styles = StyleSheet.create({
  // Container chính
  container: {
    flex: 1,
  },

  // Style cho bản đồ
  map: {
    flex: 1,
  },

  // Style cho loading container
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Styles cho modal
  modalView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalScroll: {
    padding: 15,
  },

  recipeCard: {
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: 'hidden',
  },

  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  refreshButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007AFF',
  },
});
