// Root component của ứng dụng


// Cấu hình navigation và các providers
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Animated } from 'react-native';

import MapScreen from "./src/screens/Map";
import MenuScreen from "./src/screens/Menu";
import ProfileScreen from "./src/screens/Profile";
import { RecipeProvider } from './src/context/RecipeContext';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/theme/ThemeContext';

// Khởi tạo Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RecipeProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
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
                        transform: [
                          {
                            scale: focused ? 1.2 : 1
                          }
                        ]
                      }}
                    >
                      <Ionicons name={iconName} size={size} color={color} />
                    </Animated.View>
                  );
                },
                tabBarStyle: {
                  height: 60,
                  paddingBottom: 5
                },
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: 'gray'
              })}
            >
              <Tab.Screen name="Bản đồ" component={MapScreen} />
              <Tab.Screen name="Menu" component={MenuScreen} />
              <Tab.Screen name="Cá nhân" component={ProfileScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </RecipeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}