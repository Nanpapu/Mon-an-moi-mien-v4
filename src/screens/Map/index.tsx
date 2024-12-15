import React, { useRef, useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import MapView, { Region as MapRegion } from "react-native-maps";
import { Recipe } from "../../types";
import { saveRecipe } from "../../utils/storage";
import { useRecipes } from "../../context/RecipeContext";
import { styles } from "./styles";
import { useMapData } from "./hooks/useMapData";
import { useMapInteraction } from "./hooks/useMapInteraction";
import { useModalAnimation } from "./hooks/useModalAnimation";
import { MapMarkers } from "./components/MapMarkers";
import { MapControls } from "./components/MapControls";
import { LoadingOverlay } from "./components/LoadingOverlay";
import { RecipeModal } from "./components/RecipeModal";

export default function MapScreen({ navigation }: { navigation: any }) {
  const { refreshSavedRecipes } = useRecipes();
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  
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
  
  const slideAnim = useModalAnimation(modalVisible);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapReady(true);
    }, 1000);
    return () => clearTimeout(timer);
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

  if (!regions || regions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Không có dữ liệu vùng miền</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider="google"
        style={styles.map}
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

      {!isMapReady && (
        <View style={styles.loadingContainer}>
          <LoadingOverlay isLoading={true} />
        </View>
      )}

      <RecipeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        recipes={selectedRecipes}
        onSaveRecipe={handleSaveRecipe}
        slideAnim={slideAnim}
      />

      <MapControls
        onRefresh={refreshRegions}
        regions={regions}
        onRandomSelect={handleRandomRecipe}
      />

      <LoadingOverlay isLoading={isLoading} />
    </View>
  );
}
