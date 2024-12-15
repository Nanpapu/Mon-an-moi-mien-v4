import React from 'react';
import { Text, StyleSheet, TextProps, StyleProp, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
  color?: 'primary' | 'secondary' | 'disabled' | 'error';
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

export const Typography = ({
  variant = 'body1',
  color = 'primary',
  align = 'left',
  style,
  children,
  ...props
}: TypographyProps) => {
  const { theme } = useTheme();

  const getColor = () => {
    switch (color) {
      case 'secondary':
        return theme.colors.text.secondary;
      case 'disabled':
        return theme.colors.text.disabled;
      case 'error':
        return theme.colors.error.main;
      default:
        return theme.colors.text.primary;
    }
  };

  return (
    <Text
      style={[
        theme.typography[variant],
        { color: getColor(), textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
