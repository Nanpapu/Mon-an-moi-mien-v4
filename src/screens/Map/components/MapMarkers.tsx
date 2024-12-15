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
  if (!isMapReady) return null;

  return (
    <>
      {regions.map((region) => (
        <Marker
          key={region.id}
          coordinate={region.coordinate}
          title={region.name}
          onPress={() => {
            console.log('Region recipes:', region.recipes);
            onMarkerPress(region.recipes);
          }}
        />
      ))}
    </>
  );
}
