import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Typography } from '../../../components/shared';
import { useTheme } from '../../../theme/ThemeContext';

interface Props {
  onPress: () => void;
}

export const GoogleSignInButton = ({ onPress }: Props) => {
  const { theme } = useTheme();
  
  return (
    <View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: theme.spacing.lg
      }}>
        <View style={{
          flex: 1,
          height: 1,
          backgroundColor: theme.colors.divider
        }} />
        <Typography 
          variant="caption" 
          color="secondary"
          style={{ marginHorizontal: theme.spacing.md }}
        >
          HOẶC
        </Typography>
        <View style={{
          flex: 1,
          height: 1,
          backgroundColor: theme.colors.divider
        }} />
      </View>
      
      <TouchableOpacity 
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#4285F4',
          padding: theme.spacing.md,
          borderRadius: theme.spacing.sm,
          ...theme.shadows.sm
        }} 
        onPress={onPress}
      >
        <Ionicons name="logo-google" size={24} color="white" />
        <Typography
          variant="body1"
          style={{
            color: 'white',
            marginLeft: theme.spacing.sm
          }}
        >
          Đăng nhập với Google
        </Typography>
      </TouchableOpacity>
    </View>
  );
};
