import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Typography } from '../../../components/shared';
import { useTheme } from '../../../theme/ThemeContext';
import { styles } from '../styles';

interface Props {
  isLoading: boolean;
}

export const LoadingOverlay = ({ isLoading }: Props) => {
  const { theme } = useTheme();
  
  if (!isLoading) return null;
  
  return (
    <View style={[
      styles.loadingOverlay, 
      styles.loadingContainer,
      { backgroundColor: theme.colors.background.paper }
    ]}>
      <ActivityIndicator size="large" color={theme.colors.primary.main} />
      <Typography 
        variant="body1" 
        color="secondary"
        style={{ marginTop: theme.spacing.md }}
      >
        Đang tải dữ liệu...
      </Typography>
    </View>
  );
};
