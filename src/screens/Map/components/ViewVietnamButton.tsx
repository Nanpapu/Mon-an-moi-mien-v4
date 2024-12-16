import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../theme/ThemeContext';

interface Props {
  onPress: () => void;
}

export const ViewVietnamButton = ({ onPress }: Props) => {
  const { theme } = useTheme();
  
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        styles.button,
        { 
          backgroundColor: theme.colors.background.paper,
          ...theme.shadows.sm
        }
      ]}
    >
      <Ionicons 
        name="map-outline" 
        size={24} 
        color={theme.colors.primary.main} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
