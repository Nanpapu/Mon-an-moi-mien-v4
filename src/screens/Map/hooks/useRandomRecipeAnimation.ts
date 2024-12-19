import { useRef } from 'react';
import MapView from 'react-native-maps';
import { Recipe } from '../../../types';

interface SearchPoint {
  lat: number;
  lng: number;
  name: string;
}

const SEARCH_POINTS: SearchPoint[] = [
  { lat: 21.028511, lng: 105.804817, name: 'Hà Nội' },      // Miền Bắc
  { lat: 16.047079, lng: 108.206230, name: 'Đà Nẵng' },     // Miền Trung
  { lat: 10.762622, lng: 106.660172, name: 'TP.HCM' },      // Miền Nam
  { lat: 12.235825, lng: 109.190483, name: 'Nha Trang' },   // Duyên hải
  { lat: 21.394305, lng: 103.017830, name: 'Sơn La' },      // Tây Bắc
  { lat: 10.045162, lng: 105.746857, name: 'Cần Thơ' }      // ĐBSCL
];

export const useRandomRecipeAnimation = (mapRef: React.RefObject<MapView>) => {
  // Tạo random points và thực hiện animation
  const animateRandomSearch = (
    targetLatitude: number,
    targetLongitude: number,
    recipes: Recipe[],
    onAnimationComplete: (recipes: Recipe[]) => void
  ) => {
    // Chọn ngẫu nhiên 4 điểm từ danh sách
    const randomPoints = [...SEARCH_POINTS]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
      .map(point => ({
        latitude: point.lat + (Math.random() - 0.5) * 0.5,
        longitude: point.lng + (Math.random() - 0.5) * 0.5,
        latitudeDelta: 4,
        longitudeDelta: 4,
      }));

    // Di chuyển qua từng điểm
    let delay = 0;
    randomPoints.forEach((point) => {
      setTimeout(() => {
        mapRef.current?.animateToRegion(point, 800);
      }, delay);
      delay += 800;
    });

    // Di chuyển đến điểm đích
    setTimeout(() => {
      mapRef.current?.animateToRegion({
        latitude: targetLatitude,
        longitude: targetLongitude,
        latitudeDelta: 2,
        longitudeDelta: 2,
      }, 1000);
    }, delay);

    // Callback khi animation hoàn tất
    setTimeout(() => {
      onAnimationComplete(recipes);
    }, delay + 1000);
  };

  return {
    animateRandomSearch
  };
}; 