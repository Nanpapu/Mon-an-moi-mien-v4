import React, { useRef, useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import MapView, { Region as MapRegion } from "react-native-maps";
import { Recipe } from "../../types";
import { saveRecipe } from "../../utils/storage";
import { useRecipes } from "../../context/RecipeContext";
import { styles } from "./styles";
import { useMapData } from "./hooks/useMapData";
import { useMapInteraction } from "./hooks/useMapInteraction";
import { MapMarkers } from "./components/MapMarkers";
import { MapControls } from "./components/MapControls";
import { LoadingOverlay } from "./components/LoadingOverlay";
import { RecipeModal } from "./components/RecipeModal";
import { RandomRecipeButton } from "../../components/buttons";
import { RippleButton } from "../../components/buttons";
import { ImportButton } from "../../components/buttons";
import { useTheme } from '../../theme/ThemeContext';
import { Loading } from '../../components/shared';
import * as Location from 'expo-location';

export default function MapScreen({ navigation }: { navigation: any }) {
  const { theme } = useTheme();
  const { refreshSavedRecipes } = useRecipes();
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  
  const mapRef = useRef<MapView>(null);
  const { regions, isLoading, refreshRegions } = useMapData();
  const { 
    currentZoom, 
    region, 
    setRegion, 
    calculateZoom, 
    shouldShowMarker,
    setCurrentZoom 
  } = useMapInteraction();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapReady(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(status === 'granted');
    })();
  }, []);

  const handleSaveRecipe = async (recipe: Recipe) => {
    const success = await saveRecipe(recipe);
    if (success) {
      await refreshSavedRecipes();
      Alert.alert("Thành công", "Đã lưu công thức vào Menu của bạn");
    } else {
      Alert.alert("Thông báo", "Công thức này đã được lưu trước đó");
    }
  };

  const handleRandomRecipe = (latitude: number, longitude: number, recipes: Recipe[]) => {
    const newRegion: MapRegion = {
      latitude,
      longitude,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    };
    
    mapRef.current?.animateToRegion(newRegion, 1000);
    
    setTimeout(() => {
      setSelectedRecipes(recipes);
      setModalVisible(true);
    }, 1000);
  };

  const onSearch = async (query: string) => {
    if (!query.trim()) return;
    
    try {
      if (!hasLocationPermission) {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            "Cần quyền truy cập",
            "Ứng dụng cần quyền truy cập vị trí để tìm kiếm địa điểm"
          );
          return;
        }
        setHasLocationPermission(true);
      }

      const result = await Location.geocodeAsync(query);
      if (result.length > 0) {
        const { latitude, longitude } = result[0];
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };
        mapRef.current?.animateToRegion(newRegion, 1000);
      } else {
        Alert.alert("Thông báo", "Không tìm thấy địa điểm");
      }
    } catch (error) {
      console.error('Lỗi tìm kiếm:', error);
      Alert.alert("Lỗi", "Không thể tìm kiếm địa điểm");
    }
  };

  if (!regions || regions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Không có dữ liệu vùng miền</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        provider="google"
        style={{ flex: 1 }}
        initialRegion={region}
        onRegionChange={(newRegion) => {
          setRegion(newRegion);
          setCurrentZoom(calculateZoom(newRegion.latitudeDelta));
        }}
        onMapReady={() => setIsMapReady(true)}
      >
        <MapMarkers
          regions={regions}
          isMapReady={isMapReady}
          currentZoom={currentZoom}
          shouldShowMarker={shouldShowMarker}
          onMarkerPress={(recipes) => {
            setSelectedRecipes(recipes);
            setModalVisible(true);
          }}
        />
      </MapView>

      <MapControls
        onRefresh={refreshRegions}
        regions={regions}
        onRandomSelect={handleRandomRecipe}
        onSearch={onSearch}
      />

      <RecipeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        recipes={selectedRecipes}
        onSaveRecipe={handleSaveRecipe}
      />

      {isLoading && <Loading overlay text="Đang tải..." />}
    </View>
  );
}
