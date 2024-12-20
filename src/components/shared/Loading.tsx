import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface LoadingProps {
  loading?: boolean;
  text?: string;
  overlay?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Loading = ({
  loading = true,
  text,
  overlay = false,
  style,
}: LoadingProps) => {
  const { theme } = useTheme();

  if (!loading) return null;

  return (
    <View
      style={[
        styles.container,
        overlay && styles.overlay,
        {
          backgroundColor: overlay
            ? 'rgba(0, 0, 0, 0.5)'
            : theme.colors.background.default,
        },
        style,
      ]}
    >
      <ActivityIndicator
        size="large"
        color={overlay ? '#fff' : theme.colors.primary.main}
      />
      {text && (
        <Text
          style={[
            styles.text,
            theme.typography.body2,
            { color: overlay ? '#fff' : theme.colors.text.primary },
          ]}
        >
          {text}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  text: {
    marginTop: 12,
  },
});
