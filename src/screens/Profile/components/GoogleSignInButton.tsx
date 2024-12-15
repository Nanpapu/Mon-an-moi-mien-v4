import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { styles } from '../styles';

interface Props {
  onPress: () => void;
}

export const GoogleSignInButton = ({ onPress }: Props) => {
  return (
    <View>
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>HOẶC</Text>
        <View style={styles.dividerLine} />
      </View>
      
      <TouchableOpacity style={styles.googleButton} onPress={onPress}>
        <Ionicons name="logo-google" size={24} color="white" />
        <Text style={[styles.buttonText, { marginLeft: 10 }]}>
          Đăng nhập với Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};
