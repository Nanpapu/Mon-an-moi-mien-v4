import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { styles } from '../styles';

interface Props {
  isLoading: boolean;
}

export const LoadingOverlay = ({ isLoading }: Props) => {
  if (!isLoading) return null;
  
  return (
    <View style={[styles.loadingOverlay, styles.loadingContainer]}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
    </View>
  );
};
