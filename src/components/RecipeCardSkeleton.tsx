import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

export function RecipeCardSkeleton() {
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#E1E9EE'
  },
  content: {
    padding: 15,
  },
  title: {
    height: 24,
    backgroundColor: '#E1E9EE',
    borderRadius: 4,
    marginBottom: 8
  },
  region: {
    height: 16,
    backgroundColor: '#E1E9EE',
    borderRadius: 4,
    width: '40%',
    marginBottom: 15
  },
  ingredients: {
    height: 100,
    backgroundColor: '#E1E9EE',
    borderRadius: 4
  }
}); 