import React from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';
import { Typography } from '../../../components/shared';
import { useTheme } from '../../../theme/ThemeContext';
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
          {shouldShowMarker(region.id, currentZoom) && (
            <View style={[
              {
                backgroundColor: theme.colors.primary.main,
                paddingHorizontal: theme.spacing.md,
                paddingVertical: theme.spacing.sm,
                borderRadius: theme.spacing.lg,
                minWidth: 80,
                alignItems: 'center',
              },
              theme.shadows.sm
            ]}>
              <Typography
                variant="body1"
                style={{ color: theme.colors.primary.contrast }}
              >
                {region.name}
              </Typography>
              <View style={{
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
                borderTopColor: theme.colors.primary.main,
                alignSelf: 'center',
              }} />
            </View>
          )}
        </Marker>
      ))}
    </>
  );
}
