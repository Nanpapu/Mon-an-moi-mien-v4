import React from 'react';
import { Animated } from 'react-native';
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
    return null;
  }

  return (
    <>
      {regions.map((region) => {
        const shouldShow = shouldShowMarker(region.id, currentZoom);
        
        if (!shouldShow) return null;

        return (
          <Marker
            key={region.id}
            coordinate={region.coordinate}
            title={region.name}
            onPress={() => onMarkerPress(region.recipes)}
            tracksViewChanges={false}
          />
        );
      })}
    </>
  );
}
