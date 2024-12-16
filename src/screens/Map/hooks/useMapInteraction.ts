import { useState, useRef } from 'react';
import MapView from 'react-native-maps';

const VIETNAM_REGION = {
  latitude: 16.047079,
  longitude: 108.20623,
  latitudeDelta: 12,
  longitudeDelta: 12,
};

export const useMapInteraction = () => {
  const [currentZoom, setCurrentZoom] = useState(10);
  const [region, setRegion] = useState(VIETNAM_REGION);

  const calculateZoom = (latitudeDelta: number) => {
    return Math.round(Math.log(360 / latitudeDelta) / Math.LN2);
  };

  const shouldShowMarker = (regionId: string, zoom: number) => {
    const majorCities = ["01", "48", "79"];
    if (majorCities.includes(regionId)) {
      return zoom > 2;
    }
    return zoom > 3.5;
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
    VIETNAM_REGION
  };
};
