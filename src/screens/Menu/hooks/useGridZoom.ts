import { useState } from 'react';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

// Các cấu hình zoom
export const ZOOM_LEVELS = {
  LEVEL_1: {
    // 2x2
    columns: 2,
    spacing: 16,
    showTitle: true,
    minTitleHeight: 50,
  },
  LEVEL_2: {
    // 3x3
    columns: 3,
    spacing: 12,
    showTitle: true,
    minTitleHeight: 40,
  },
  LEVEL_3: {
    // 4x4
    columns: 4,
    spacing: 8,
    showTitle: false,
    minTitleHeight: 0,
  },
};

export const useGridZoom = () => {
  const [zoomLevel, setZoomLevel] =
    useState<keyof typeof ZOOM_LEVELS>('LEVEL_1');

  const currentConfig = ZOOM_LEVELS[zoomLevel];

  const calculateItemWidth = () => {
    const { columns, spacing } = currentConfig;
    return (windowWidth - spacing * (columns + 1)) / columns;
  };

  const zoomIn = () => {
    console.log('Zoom In - Current level:', zoomLevel);
    if (zoomLevel === 'LEVEL_1') setZoomLevel('LEVEL_2');
    else if (zoomLevel === 'LEVEL_2') setZoomLevel('LEVEL_3');
    console.log('New level:', zoomLevel);
  };

  const zoomOut = () => {
    console.log('Zoom Out - Current level:', zoomLevel);
    if (zoomLevel === 'LEVEL_3') setZoomLevel('LEVEL_2');
    else if (zoomLevel === 'LEVEL_2') setZoomLevel('LEVEL_1');
    console.log('New level:', zoomLevel);
  };

  return {
    zoomLevel,
    currentConfig,
    calculateItemWidth,
    zoomIn,
    zoomOut,
    canZoomIn: zoomLevel !== 'LEVEL_3',
    canZoomOut: zoomLevel !== 'LEVEL_1',
  };
};
