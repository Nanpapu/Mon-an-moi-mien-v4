import { useState, useRef } from 'react';
import MapView from 'react-native-maps';

const VIETNAM_REGION = {
  latitude: 16.047079,
  longitude: 108.20623,
  latitudeDelta: 12,
  longitudeDelta: 12,
};

// Điều chỉnh lại các mức zoom phù hợp hơn
const ZOOM_LEVELS = {
  COUNTRY: 4,  // Zoom xa hơn để dễ nhìn toàn Việt Nam
  REGION: 6,   // Mức zoom vùng miền
  CITY: 7,     // Mức zoom tỉnh/thành phố
  DISTRICT: 8    // Mức zoom chi tiết
};

// Thêm nhiều thành phố hơn để dễ tìm
const MAJOR_CITIES = [
  '48', // Đà Nẵng
  '01', // Hà Nội
  '79', // TP.HCM
  '46', // Huế
  '92', // Cần Thơ
  '95'  // Bạc Liêu
];

export const useMapInteraction = () => {
  const [currentZoom, setCurrentZoom] = useState(10);
  const [region, setRegion] = useState(VIETNAM_REGION);

  // Tính toán mức zoom dựa trên latitudeDelta
  const calculateZoom = (latitudeDelta: number) => {
    return Math.round(Math.log(360 / latitudeDelta) / Math.LN2);
  };

  const shouldShowMarker = (regionId: string, zoom: number) => {
    // Luôn hiển thị các thành phố lớn
    if (MAJOR_CITIES.includes(regionId)) {
      return true;
    }

    // Điều chỉnh logic hiển thị marker
    if (zoom <= ZOOM_LEVELS.COUNTRY) {
      // Ở mức zoom toàn quốc, chỉ hiển thị thành phố lớn và một số điểm đáng chú ý
      return MAJOR_CITIES.includes(regionId);
    } else if (zoom <= ZOOM_LEVELS.REGION) {
      // Ở mức zoom vùng miền, hiển thị thêm các tỉnh lân cận
      return true;
    } else {
      // Ở mức zoom chi tiết hơn, hiển thị tất cả
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
