import React from 'react';
import { Marker } from 'react-native-maps';
import { Region, Recipe } from '../../../types';

interface Props {
  regions: Region[];
  isMapReady: boolean;
  currentZoom: number;
  shouldShowMarker: (regionId: string, zoom: number) => boolean;
  onMarkerPress: (recipes: Recipe[]) => void;
}

export const MapMarkers = ({ 
  regions, 
  isMapReady, 
  currentZoom, 
  shouldShowMarker,
  onMarkerPress 
}: Props) => {
  if (!isMapReady) return null;

  return (
    <>
      {regions.map((region) =>
        shouldShowMarker(region.id, currentZoom) && (
          <Marker
            key={region.id}
            coordinate={region.coordinate}
            title={region.name}
            onPress={() => onMarkerPress(region.recipes)}
          />
        )
      )}
    </>
  );
};
