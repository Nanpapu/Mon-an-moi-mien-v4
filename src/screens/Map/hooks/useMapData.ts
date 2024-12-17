import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Region } from '../../../types';
import { RegionService } from '../../../services/regionService';

export const useMapData = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadRegions = async (forceRefresh = false) => {
    try {
      setIsLoading(true);
      
      if (forceRefresh) {
        // Xóa cache nếu cần refresh
        await RegionService.clearRegionsCache();
      }
      
      const data = await RegionService.getAllRegions();
      console.log('Loaded data from RegionService:', data);
      setRegions(data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      Alert.alert("Lỗi", "Không thể tải dữ liệu vùng miền");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRegions();
  }, []);

  return {
    regions,
    isLoading,
    refreshRegions: () => loadRegions(true) // Force refresh khi người dùng pull-to-refresh
  };
};
