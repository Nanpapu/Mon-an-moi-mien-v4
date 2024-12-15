import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export const useAuthAnimation = (isRegistering: boolean) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isRegistering]);

  const animateFormTransition = () => {
    fadeAnim.setValue(0);
    slideAnim.setValue(40);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return {
    fadeAnim,
    slideAnim,
    animateFormTransition,
  };
};
