import React, { useState, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Ionicons } from "@expo/vector-icons";
import { Region } from '../../types';
import * as Haptics from 'expo-haptics';
import { Tooltip } from '../shared/Tooltip';

interface Props {
  regions: Region[];
  onRandomSelect: (latitude: number, longitude: number, recipes: any[], shouldAnimate?: boolean) => void;
  disabled?: boolean;
}

export function RandomRecipeButton({ regions, onRandomSelect, disabled }: Props) {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const handleRandomRecipe = async () => {
    const allRegions = regions.filter(region => region.recipes.length > 0);
    if (allRegions.length === 0 || disabled) return;

    setIsLoading(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Animation nút
    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 0.8,
        useNativeDriver: true,
        speed: 50,
        bounciness: 10
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
        bounciness: 10
      })
    ]).start();

    // Animation xoay
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();

    // Delay nhẹ 200ms
    await new Promise(resolve => setTimeout(resolve, 200));

    const randomRegion = allRegions[Math.floor(Math.random() * allRegions.length)];
    onRandomSelect(
      randomRegion.coordinate.latitude,
      randomRegion.coordinate.longitude,
      randomRegion.recipes,
      true // flag để trigger animation
    );

    setTimeout(() => {
      setIsLoading(false);
      spinValue.setValue(0);
    }, 1000);
  };

  return (
    <Tooltip text="Khám phá ngẫu nhiên một công thức nấu ăn">
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: theme.colors.background.paper,
            opacity: disabled ? 0.6 : 1,
            ...theme.shadows.sm,
          }
        ]}
        onPress={handleRandomRecipe}
        disabled={disabled || isLoading}
      >
        <Animated.View 
          style={{ 
            transform: [
              { rotate: spin },
              { scale: scaleValue }
            ]
          }}
        >
          <Ionicons
            name="dice"
            size={24}
            color={theme.colors.primary.main}
          />
        </Animated.View>
      </TouchableOpacity>
    </Tooltip>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20, // Đưa xuống sát bottom
    left: 16, // Đặt bên trái màn hình
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
