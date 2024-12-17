import { useState, useRef } from 'react';
import MapView from 'react-native-maps';

const VIETNAM_REGION = {
  latitude: 16.047079,
  longitude: 108.20623,
  latitudeDelta: 12,
  longitudeDelta: 12,
};

// Các mức zoom để hiển thị marker
const ZOOM_LEVELS = {
  COUNTRY: 6, // Hiển thị các thành phố lớn
  REGION: 8,  // Hiển thị các tỉnh/thành phố
  CITY: 10,   // Hiển thị các quận/huyện
  DISTRICT: 12 // Hiển thị chi tiết
};

// Danh sách các thành phố lớn
const MAJOR_CITIES = ['48', '01', '79']; // IDs của Đà Nẵng, Hà Nội, TP.HCM

export const useMapInteraction = () => {
  const [currentZoom, setCurrentZoom] = useState(10);
  const [region, setRegion] = useState(VIETNAM_REGION);

  const calculateZoom = (latitudeDelta: number) => {
    const zoom = Math.round(Math.log(360 / latitudeDelta) / Math.LN2);
    return zoom;
  };

  const shouldShowMarker = (regionId: string, zoom: number) => {
    // Luôn hiển thị các thành phố lớn
    if (MAJOR_CITIES.includes(regionId)) {
      return true;
    }

    // Hiển thị dựa vào mức zoom
    if (zoom <= ZOOM_LEVELS.COUNTRY) {
      // Ở mức zoom toàn quốc, chỉ hiển thị thành phố lớn
      return MAJOR_CITIES.includes(regionId);
    } else if (zoom <= ZOOM_LEVELS.REGION) {
      // Ở mức zoom vùng miền, hiển thị các tỉnh/thành phố
      return true;
    } else {
      // Ở mức zoom chi tiết, hiển thị tất cả
      return true;
    }
  };

  const viewVietnam = (mapRef: React.RefObject<MapView>) => {
    mapRef.current?.animateToRegion(VIETNAM_REGION, 1000);
  };

  return {
    currentZoom,
    region,
    setRegion,
    calculateZoom,
    shouldShowMarker,
    setCurrentZoom,
    viewVietnam,
    VIETNAM_REGION,
    ZOOM_LEVELS
  };
};
