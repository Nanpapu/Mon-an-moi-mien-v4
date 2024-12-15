import React from 'react';
import { Modal, Animated, TouchableOpacity, ScrollView, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Recipe } from '../../../types';
import { RecipeCard } from '../../../components/RecipeCard';
import { styles } from '../styles';

interface Props {
  visible: boolean;
  onClose: () => void;
  recipes: Recipe[];
  onSaveRecipe: (recipe: Recipe) => void;
  slideAnim: Animated.Value;
}

export const RecipeModal = ({ visible, onClose, recipes, onSaveRecipe, slideAnim }: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Animated.View 
        style={[
          styles.modalView,
          {
            transform: [{
              translateY: slideAnim
            }]
          }
        ]}
      >
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <Ionicons name="close-circle" size={32} color="#666" />
        </TouchableOpacity>
        <ScrollView style={styles.modalScroll}>
          {recipes.map((recipe) => (
            <View key={recipe.id} style={styles.recipeCard}>
              <RecipeCard
                recipe={recipe}
                onSave={() => onSaveRecipe(recipe)}
                showActions={true}
                showReviews={true}
              />
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
};
