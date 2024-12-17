import React from 'react';
import { Marker } from 'react-native-maps';
import { Region } from '../../../types';

interface Props {
  regions: Region[];
  isMapReady: boolean;
  currentZoom: number;
  shouldShowMarker: (regionId: string, zoom: number) => boolean;
  onMarkerPress: (recipes: any[]) => void;
}

export function MapMarkers({
  regions,
  isMapReady,
  currentZoom,
  shouldShowMarker,
  onMarkerPress,
}: Props) {
  if (!isMapReady) {
    console.log('Map not ready yet');
    return null;
  }

  console.log('MapMarkers - Total regions:', regions.length);
  
  return (
    <>
      {regions.map((region) => {
        const shouldShow = shouldShowMarker(region.id, currentZoom);
        console.log(`Region ${region.name}: shouldShow = ${shouldShow}`);
        
        return (
          <Marker
            key={region.id}
            coordinate={region.coordinate}
            title={region.name}
            onPress={() => onMarkerPress(region.recipes)}
          />
        );
      })}
    </>
  );
}
