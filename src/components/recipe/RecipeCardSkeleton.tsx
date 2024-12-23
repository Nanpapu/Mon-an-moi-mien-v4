import React, { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';
import { createStyles } from './RecipeCardSkeleton.styles';
import { useTheme } from '../../theme/ThemeContext';

export function RecipeCardSkeleton() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7]
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.image, { opacity }]} />
      <View style={styles.content}>
        <Animated.View style={[styles.title, { opacity }]} />
        <Animated.View style={[styles.region, { opacity }]} />
        <Animated.View style={[styles.ingredients, { opacity }]} />
      </View>
    </View>
  );
}
