import React, { useState } from 'react';
import { TouchableOpacity, Modal, View, ActivityIndicator, Alert } from 'react-native';
import { Typography } from '../shared';
import { useTheme } from '../../theme/ThemeContext';
import { db } from '../../config/firebase';
import { doc, writeBatch, Timestamp } from 'firebase/firestore';
import { COLLECTIONS } from '../../constants';
import { regions } from '../../data/regions';

export function ImportButton() {
  const { theme } = useTheme();
  const [isImporting, setIsImporting] = useState(false);

  const handleImportData = async () => {
    setIsImporting(true);
    try {
      // Tạo batch để thực hiện nhiều thao tác cùng lúc
      const batch = writeBatch(db);

      for (const region of regions) {
        const { recipes: regionRecipes, ...regionData } = region;

        // 1. Tạo document cho region
        const regionRef = doc(db, COLLECTIONS.REGIONS, region.id);
        batch.set(regionRef, {
          ...regionData,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });

        // 2. Tạo documents cho recipes và recipeStats
        for (const recipe of regionRecipes) {
          // Tạo recipe document
          const recipeRef = doc(db, COLLECTIONS.RECIPES, recipe.id);
          batch.set(recipeRef, {
            ...recipe,
            regionId: region.id,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
          });

          // Tạo recipeStats document với giá trị mặc định
          const recipeStatsRef = doc(db, COLLECTIONS.RECIPE_STATS, recipe.id);
          batch.set(recipeStatsRef, {
            recipeId: recipe.id,
            averageRating: 0,
            totalReviews: 0,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
          });
        }
      }

      // Thực hiện tất cả các thao tác
      await batch.commit();
      Alert.alert('Thành công', 'Đã import dữ liệu vào Firestore');
    } catch (error) {
      console.error("Lỗi khi import dữ liệu:", error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi import dữ liệu');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <>
      <TouchableOpacity 
        style={[{
          backgroundColor: theme.colors.primary.main,
          padding: theme.spacing.md,
          borderRadius: theme.spacing.sm,
          alignItems: 'center',
          ...theme.shadows.sm
        }]}
        onPress={handleImportData}
        disabled={isImporting}
      >
        <Typography 
          variant="body1"
          style={{ color: theme.colors.primary.contrast }}
        >
          Import Dữ Liệu
        </Typography>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isImporting}
        animationType="fade"
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            backgroundColor: theme.colors.background.paper,
            padding: theme.spacing.lg,
            borderRadius: theme.spacing.md,
            alignItems: 'center',
            ...theme.shadows.md
          }}>
            <ActivityIndicator size="large" color={theme.colors.primary.main} />
            <Typography
              variant="body1"
              style={{ marginTop: theme.spacing.md }}
            >
              Đang import dữ liệu...
            </Typography>
          </View>
        </View>
      </Modal>
    </>
  );
}
