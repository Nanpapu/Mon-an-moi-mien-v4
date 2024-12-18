// Root component của ứng dụng

// Cấu hình navigation và các providers
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Animated } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemedStatusBar } from './src/components/shared/ThemedStatusBar';
import { useTheme } from './src/theme/ThemeContext';

import MapScreen from './src/screens/Map';
import MenuScreen from './src/screens/Menu';
import ProfileScreen from './src/screens/Profile';
import { RecipeProvider } from './src/context/RecipeContext';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/theme/ThemeContext';
import { ToastProvider } from './src/context/ToastContext';
import { AppBar } from './src/components/shared/AppBar';
import { RootSiblingParent } from 'react-native-root-siblings';

// Khởi tạo Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <SafeAreaProvider>
        <ThemeProvider>
          <ToastProvider>
            <ThemedStatusBar />
            <AuthProvider>
              <RecipeProvider>
                <NavigationContainer>
                  <Tab.Navigator
                    screenOptions={({ route }) => {
                      const { theme } = useTheme();

                      return {
                        header: ({ route }) => <AppBar title={route.name} />,
                        tabBarIcon: ({ focused, size }) => {
                          let iconName: keyof typeof Ionicons.glyphMap;
                          if (route.name === 'Bản đồ') {
                            iconName = focused ? 'map' : 'map-outline';
                          } else if (route.name === 'Menu') {
                            iconName = focused ? 'book' : 'book-outline';
                          } else {
                            iconName = focused ? 'person' : 'person-outline';
                          }
                          return (
                            <Animated.View
                              style={{
                                transform: [{ scale: focused ? 1.2 : 1 }],
                              }}
                            >
                              <Ionicons
                                name={iconName}
                                size={size}
                                color={theme.colors.primary.main}
                              />
                            </Animated.View>
                          );
                        },
                        tabBarStyle: {
                          height: 60,
                          paddingBottom: 5,
                          backgroundColor: theme.colors.background.paper,
                          borderTopColor: theme.colors.divider,
                        },
                        tabBarActiveTintColor: theme.colors.primary.main,
                        tabBarInactiveTintColor: theme.colors.text.secondary,
                        headerStyle: {
                          backgroundColor: theme.colors.background.paper,
                        },
                        headerTintColor: theme.colors.text.primary,
                      };
                    }}
                  >
                    <Tab.Screen name="Bản đồ" component={MapScreen} />
                    <Tab.Screen name="Menu" component={MenuScreen} />
                    <Tab.Screen name="Cá nhân" component={ProfileScreen} />
                  </Tab.Navigator>
                </NavigationContainer>
              </RecipeProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </RootSiblingParent>
  );
}
