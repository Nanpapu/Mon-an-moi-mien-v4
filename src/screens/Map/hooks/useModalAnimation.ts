import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export const useModalAnimation = (modalVisible: boolean) => {
  const slideAnim = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    if (modalVisible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 5
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 500,
        duration: 300,
        useNativeDriver: true
      }).start();
    }
  }, [modalVisible]);

  return slideAnim;
};
