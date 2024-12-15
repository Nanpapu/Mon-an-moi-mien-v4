import React from 'react';
import { Marker } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../../../components/shared';
import { useTheme } from '../../../theme/ThemeContext';
import { Region } from '../../../types';

interface Props {
  regions: Region[];
  isMapReady: boolean;
  currentZoom: number;
  shouldShowMarker: (zoom: number) => boolean;
  onMarkerPress: (recipes: any[]) => void;
}

export function MapMarkers({
  regions,
  isMapReady,
  currentZoom,
  shouldShowMarker,
  onMarkerPress,
}: Props) {
  const { theme } = useTheme();

  if (!isMapReady) return null;

  return (
    <>
      {regions.map((region) => (
        <Marker
          key={region.id}
          coordinate={region.coordinate}
          onPress={() => onMarkerPress(region.recipes)}
        >
          <View style={[
            styles.markerContainer,
            {
              backgroundColor: theme.colors.primary.main,
              ...theme.shadows.sm,
            }
          ]}>
            <Typography
              variant="caption"
              style={{ color: '#FFFFFF' }}
            >
              {region.name}
            </Typography>
            <View style={[
              styles.markerArrow,
              { borderTopColor: theme.colors.primary.main }
            ]} />
          </View>
        </Marker>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  markerContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 80,
  },
  markerArrow: {
    position: 'absolute',
    bottom: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    alignSelf: 'center',
  },
});
