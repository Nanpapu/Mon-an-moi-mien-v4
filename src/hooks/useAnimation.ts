import { useRef } from 'react';
import { Animated } from 'react-native';

export const useAnimation = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;

  const fadeIn = (duration = 300) => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = (duration = 300) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const slideIn = (duration = 300) => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      damping: 20,
      stiffness: 90,
    }).start();
  };

  const slideOut = (duration = 300) => {
    Animated.spring(slideAnim, {
      toValue: 100,
      useNativeDriver: true,
      damping: 20,
      stiffness: 90,
    }).start();
  };

  return {
    fadeAnim,
    slideAnim,
    fadeIn,
    fadeOut,
    slideIn,
    slideOut,
  };
};
