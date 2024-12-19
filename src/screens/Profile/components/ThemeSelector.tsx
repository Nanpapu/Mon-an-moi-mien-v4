import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import { Typography } from '../../../components/shared';
import { useTheme } from '../../../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../hooks/useToast';

// Helper function để kiểm tra theme hiện tại có được chọn không
const isCurrentTheme = (themeId: string, currentThemeId: string) => {
  return themeId === currentThemeId;
};

// Helper function để kiểm tra theme có phải là theme mặc định không
const isDefaultTheme = (themeId: string, defaultLightId: string, defaultDarkId: string) => {
  if (themeId.includes('-special')) return false;
  return themeId === defaultLightId || themeId === defaultDarkId;
};

// Helper function để lấy style cho theme button
const getThemeButtonStyle = (theme: any, currentThemeId: string) => {
  return {
    backgroundColor: theme.colors.background.default,
    borderWidth: isCurrentTheme(theme.id, currentThemeId) ? 2 : 1,
    borderColor: isCurrentTheme(theme.id, currentThemeId)
      ? theme.colors.primary.main
      : theme.colors.border,
  };
};

// Component hiển thị chấm theme mặc định
const DefaultThemeDot = ({ theme }: { theme: any }) => (
  <View
    style={[
      styles.defaultDot,
      { backgroundColor: theme.colors.primary.main },
    ]}
  />
);

export const ThemeSelector = () => {
  const {
    currentTheme,
    setTheme,
    availableThemes,
    defaultLightTheme,
    defaultDarkTheme,
    setDefaultTheme,
  } = useTheme();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const contentHeight = useRef(0);

  if (!user) return null;

  const toggleExpand = () => {
    setExpanded(!expanded);
    Animated.timing(animatedHeight, {
      toValue: expanded ? 0 : contentHeight.current,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.cubic),
    }).start();
  };

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    contentHeight.current = height;
    if (expanded) {
      animatedHeight.setValue(height);
    }
  };

  const lightThemes = availableThemes.filter(
    (t) => !t.id.includes('dark') && !t.id.includes('-special')
  );
  const darkThemes = availableThemes.filter(
    (t) => t.id.includes('dark') && !t.id.includes('-special')
  );
  const specialThemes = availableThemes.filter((t) =>
    t.id.includes('-special')
  );

  const renderThemeButton = (theme: any) => (
    <TouchableOpacity
      key={theme.id}
      style={[
        styles.themeButton,
        getThemeButtonStyle(theme, currentTheme.id),
      ]}
      onPress={() => handleThemePress(theme)}
    >
      <View
        style={[
          styles.colorPreview,
          { backgroundColor: theme.colors.primary.main },
        ]}
      />
      <Typography
        variant="caption"
        style={[styles.themeName, { color: theme.colors.text.primary }]}
      >
        {theme.name}
      </Typography>
      {isDefaultTheme(theme.id, defaultLightTheme, defaultDarkTheme) && (
        <DefaultThemeDot theme={theme} />
      )}
    </TouchableOpacity>
  );

  const handleThemePress = (theme: any) => {
    if (theme.id.includes('-special')) {
      setTheme(theme.id);
      showToast(
        'info',
        `Đã chuyển sang giao diện ${theme.name}\nTheme đặc biệt sẽ không được lưu làm mặc định`
      );
    } else {
      setTheme(theme.id);
      setDefaultTheme(theme.id);
      showToast(
        'success',
        `Đã chuyển sang giao diện ${theme.name}\n${
          theme.id.includes('dark')
            ? 'Đã lưu làm giao diện tối mặc định'
            : 'Đã lưu làm giao diện sáng mặc định'
        }`
      );
    }
  };

  return (
    <View style={[styles.container, { borderRadius: 16, overflow: 'hidden' }]}>
      <TouchableOpacity
        style={[
          styles.header,
          {
            backgroundColor: currentTheme.colors.background.paper,
          },
        ]}
        onPress={toggleExpand}
      >
        <View style={styles.headerContent}>
          <Ionicons
            name="color-palette-outline"
            size={20}
            color={currentTheme.colors.primary.main}
            style={{ marginRight: 8 }}
          />
          <Typography
            variant="h3"
            style={{
              color: currentTheme.colors.text.primary,
              fontSize: 16,
              fontWeight: '600',
            }}
          >
            Tùy chỉnh giao diện
          </Typography>
        </View>
        <Ionicons
          name={expanded ? 'chevron-down' : 'chevron-up'}
          size={20}
          color={currentTheme.colors.text.secondary}
        />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.animatedContent,
          {
            height: animatedHeight,
            backgroundColor: currentTheme.colors.background.paper,
            opacity: animatedHeight.interpolate({
              inputRange: [0, contentHeight.current],
              outputRange: [0, 1],
            }),
          },
        ]}
      >
        <View style={styles.content} onLayout={onLayout}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="sunny-outline"
                size={18}
                color={currentTheme.colors.text.primary}
                style={{ marginRight: 6 }}
              />
              <Typography
                variant="subtitle1"
                style={[
                  styles.sectionTitle,
                  { color: currentTheme.colors.text.primary },
                ]}
              >
                Chế độ sáng
              </Typography>
            </View>
            <View style={styles.themeGrid}>
              {lightThemes.map((theme) => renderThemeButton(theme))}
            </View>
          </View>

          <View style={[styles.section]}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="moon-outline"
                size={18}
                color={currentTheme.colors.text.primary}
                style={{ marginRight: 6 }}
              />
              <Typography
                variant="subtitle1"
                style={[
                  styles.sectionTitle,
                  { color: currentTheme.colors.text.primary },
                ]}
              >
                Chế độ tối
              </Typography>
            </View>
            <View style={styles.themeGrid}>
              {darkThemes.map((theme) => renderThemeButton(theme))}
            </View>
          </View>

          {specialThemes.length > 0 && (
            <View style={[styles.section]}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="star-outline"
                  size={18}
                  color={currentTheme.colors.text.primary}
                  style={{ marginRight: 6 }}
                />
                <Typography
                  variant="subtitle1"
                  style={[
                    styles.sectionTitle,
                    { color: currentTheme.colors.text.primary },
                  ]}
                >
                  Giao diện đặc biệt
                </Typography>
              </View>
              <View style={styles.themeGrid}>
                {specialThemes.map((theme) => renderThemeButton(theme))}
              </View>
            </View>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  themeButton: {
    width: 90,
    height: 90,
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  colorPreview: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginBottom: 8,
  },
  themeName: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 11,
  },
  defaultDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    top: 6,
    right: 6,
  },
  animatedContent: {
    overflow: 'hidden',
  },
});
