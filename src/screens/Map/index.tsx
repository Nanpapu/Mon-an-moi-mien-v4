import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import MapView, { Region as MapRegion } from 'react-native-maps';
import { Recipe } from '../../types';
import { saveRecipe } from '../../utils/storage';
import { useRecipes } from '../../context/RecipeContext';
import { styles } from './styles';
import { useMapData } from './hooks/useMapData';
import { useMapInteraction } from './hooks/useMapInteraction';
import { MapMarkers } from './components/MapMarkers';
import { MapControls } from './components/MapControls';
import { RecipeModal } from './components/RecipeModal';
import { useTheme } from '../../theme/ThemeContext';
import { Loading } from '../../components/shared';
import * as Location from 'expo-location';
import { RegionService } from '../../services/regionService';
import { ViewVietnamButton } from './components/ViewVietnamButton';
import { useToast } from '../../hooks/useToast';
import { useRandomRecipeAnimation } from './hooks/useRandomRecipeAnimation';

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
    setCurrentZoom,
    viewVietnam,
  } = useMapInteraction();

  const { showToast } = useToast();
  const { animateRandomSearch } = useRandomRecipeAnimation(mapRef);

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
    try {
      const region = regions.find((r) =>
        r.recipes.some((rcp) => rcp.id === recipe.id)
      );
      if (!region) {
        throw new Error('Không tìm thấy vùng miền của công thức');
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const success = await saveRecipe(recipe, region);
      if (success) {
        showToast('success', 'Đã lưu công thức');
      } else {
        showToast('info', 'Công thức đã được lưu trước đó');
      }
      return success;
    } catch (error) {
      showToast('error', 'Không thể lưu công thức');
      return false;
    }
  };

  const handleRandomRecipe = (
    latitude: number,
    longitude: number,
    recipes: Recipe[],
    shouldAnimate = false
  ) => {
    if (shouldAnimate) {
      animateRandomSearch(latitude, longitude, recipes, (recipes) => {
        setSelectedRecipes(recipes);
        setModalVisible(true);
      });
    } else {
      mapRef.current?.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 2,
        longitudeDelta: 2,
      }, 1000);

      setTimeout(() => {
        setSelectedRecipes(recipes);
        setModalVisible(true);
      }, 1000);
    }
  };

  const onSearch = async (query: string) => {
    if (!query.trim()) return;

    try {
      if (!hasLocationPermission) {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          showToast('error', 'Cần quyền truy cập vị trí để tìm kiếm');
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
        showToast('success', 'Đã tìm thấy địa điểm');
      } else {
        showToast('warning', 'Không tìm thấy địa điểm');
      }
    } catch (error) {
      console.error('Lỗi tìm kiếm:', error);
      showToast('error', 'Không thể tìm kiếm địa điểm');
    }
  };

  const handleRefresh = async () => {
    try {
      await RegionService.clearRegionsCache();
      await refreshRegions();
    } catch (error) {
      console.error('Lỗi khi refresh:', error);
      showToast('error', 'Không thể tải lại dữ liệu');
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
          const newZoom = calculateZoom(newRegion.latitudeDelta);
          setCurrentZoom(newZoom);
        }}
        onMapReady={() => {
          console.log('Map is ready');
          setIsMapReady(true);
        }}
      >
        <MapMarkers
          regions={regions}
          isMapReady={isMapReady}
          currentZoom={currentZoom}
          shouldShowMarker={shouldShowMarker}
          onMarkerPress={(recipes) => {
            console.log('Marker pressed, recipes:', recipes.length);
            setSelectedRecipes(recipes);
            setModalVisible(true);
          }}
        />
      </MapView>

      <MapControls
        onRefresh={handleRefresh}
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

      <ViewVietnamButton
        onPress={() => {
          viewVietnam(mapRef);
        }}
      />
    </View>
  );
}
