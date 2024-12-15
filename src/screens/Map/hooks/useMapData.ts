import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Region } from '../../../types';
import { RegionService } from '../../../services/regionService';

export const useMapData = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    loadRegions();
  }, []);

  return {
    regions,
    isLoading,
    refreshRegions: loadRegions
  };
};
