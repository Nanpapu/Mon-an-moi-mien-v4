import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Animated } from 'react-native';
import { Typography } from './Typography';
import { useTheme } from '../../theme/ThemeContext';
import { THEME_CONSTANTS } from '../../theme/constants';

interface Props {
  children: React.ReactNode;
  text: string;
  position?: 'top' | 'bottom' | 'center';
}

export const Tooltip = ({ children, text, position = 'center' }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { theme } = useTheme();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const handleShow = () => {
    setShowTooltip(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: THEME_CONSTANTS.animation.duration,
      useNativeDriver: true,
    }).start();
  };

  const handleHide = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: THEME_CONSTANTS.animation.duration,
      useNativeDriver: true,
    }).start(() => setShowTooltip(false));
  };

  const getTooltipPosition = (): { justifyContent: 'flex-start' | 'flex-end' | 'center' } => {
    switch (position) {
      case 'top':
        return { justifyContent: 'flex-end' };
      case 'bottom':
        return { justifyContent: 'flex-start' };
      default:
        return { justifyContent: 'center' };
    }
  };

  return (
    <View>
      <TouchableOpacity 
        onLongPress={handleShow}
        delayLongPress={500}
        activeOpacity={0.9}
      >
        {children}
      </TouchableOpacity>

      <Modal
        visible={showTooltip}
        transparent
        animationType="none"
        onRequestClose={handleHide}
        statusBarTranslucent
      >
        <TouchableOpacity 
          style={[
            styles.modalOverlay,
            getTooltipPosition(),
            { backgroundColor: theme.colors.action.hover }
          ]}
          activeOpacity={1}
          onPress={handleHide}
        >
          <Animated.View 
            style={[
              styles.tooltipContainer,
              {
                backgroundColor: theme.colors.background.paper,
                borderRadius: theme.spacing.md,
                borderColor: theme.colors.border,
                opacity: fadeAnim,
                transform: [{
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1]
                  })
                }],
                ...theme.shadows.lg
              }
            ]}
          >
            <Typography 
              variant="body2" 
              style={{ 
                color: theme.colors.text.primary,
                textAlign: 'center'
              }}
            >
              {text}
            </Typography>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
  },
  tooltipContainer: {
    padding: 16,
    maxWidth: '80%',
    borderWidth: 1,
    margin: 16,
  }
}); 