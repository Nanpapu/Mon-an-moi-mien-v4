import { useState, useCallback } from 'react';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

// Các cấu hình zoom
export const ZOOM_LEVELS = {
  LEVEL_1: {
    // 2x2
    columns: 2,
    spacing: 8,
    showTitle: true,
    showRating: true,
    minTitleHeight: 50,
    minRatingHeight: 30,
    titleLines: 2,
  },
  LEVEL_2: {
    // 3x3
    columns: 3,
    spacing: 8,
    showTitle: true,
    showRating: true,
    minTitleHeight: 25,
    minRatingHeight: 20,
    titleLines: 1,
  },
  LEVEL_3: {
    // 4x4
    columns: 4,
    spacing: 8,
    showTitle: false,
    showRating: false,
    minTitleHeight: 0,
    minRatingHeight: 0,
    titleLines: 0,
  },
} as const;

export const useGridZoom = () => {
  const [zoomLevel, setZoomLevel] =
    useState<keyof typeof ZOOM_LEVELS>('LEVEL_1');

  const currentConfig = ZOOM_LEVELS[zoomLevel];

  const calculateItemWidth = useCallback(() => {
    const { columns, spacing } = currentConfig;
    const containerPadding = 16; // theme.spacing.md
    const availableWidth = windowWidth - containerPadding * 2; // Trừ padding container
    const itemMargin = spacing; // Margin giữa các items
    const totalMarginWidth = itemMargin * (columns - 1); // Tổng margin giữa các items
    const itemWidth = (availableWidth - totalMarginWidth) / columns;
    return Math.floor(itemWidth); // Làm tròn xuống để tránh lỗi pixel
  }, [currentConfig]);

  const zoomIn = useCallback(() => {
    setZoomLevel((current) => {
      if (current === 'LEVEL_1') return 'LEVEL_2';
      if (current === 'LEVEL_2') return 'LEVEL_3';
      return current;
    });
  }, []);

  const zoomOut = useCallback(() => {
    setZoomLevel((current) => {
      if (current === 'LEVEL_3') return 'LEVEL_2';
      if (current === 'LEVEL_2') return 'LEVEL_1';
      return current;
    });
  }, []);

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
