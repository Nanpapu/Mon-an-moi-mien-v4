import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Region } from '../../types';

interface Props {
  regions: Region[];
  onRandomSelect: (latitude: number, longitude: number, recipes: any[]) => void;
}

export function RandomRecipeButton({ regions, onRandomSelect }: Props) {
  const handleRandomRecipe = () => {
    // Lấy danh sách tất cả các công thức từ tất cả vùng
    const allRegions = regions.filter(region => region.recipes.length > 0);
    if (allRegions.length === 0) return;

    // Chọn ngẫu nhiên một vùng
    const randomRegion = allRegions[Math.floor(Math.random() * allRegions.length)];
    
    // Gọi callback với tọa độ và công thức của vùng được chọn
    onRandomSelect(
      randomRegion.coordinate.latitude,
      randomRegion.coordinate.longitude,
      randomRegion.recipes
    );
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleRandomRecipe}>
      <Ionicons name="dice" size={24} color="white" />
      <Text style={styles.buttonText}>Công Thức Ngẫu Nhiên</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
