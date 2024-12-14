import React from 'react';
import { TouchableNativeFeedback, View, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  onPress: () => void;
  style?: any;
  textStyle?: any;
  text: string;
  disabled?: boolean;
}

export const RippleButton = ({ onPress, style, textStyle, text, disabled }: Props) => {
  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity 
        style={[styles.button, style]} 
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.button, style]}>
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple('#ffffff', false)}
        disabled={disabled}
      >
        <View style={styles.buttonContent}>
          <Text style={[styles.text, textStyle]}>{text}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonContent: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  }
}); 