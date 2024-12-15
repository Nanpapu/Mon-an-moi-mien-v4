import { useState } from 'react';

export const useMapInteraction = () => {
  const [currentZoom, setCurrentZoom] = useState(10);
  const [region, setRegion] = useState({
    latitude: 16.047079,
    longitude: 108.20623,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });

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

  return {
    currentZoom,
    region,
    setRegion,
    calculateZoom,
    shouldShowMarker,
    setCurrentZoom
  };
};
