import React, { useState } from 'react';
import {
  TouchableOpacity,
  Modal,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Typography } from '../shared';
import { useTheme } from '../../theme/ThemeContext';
import { db } from '../../config/firebase';
import {
  doc,
  writeBatch,
  Timestamp,
  collection,
  getDocs,
} from 'firebase/firestore';
import { COLLECTIONS } from '../../constants';
import { regions } from '../../data/regions';
import { useToast } from '../../hooks/useToast';

export function ImportButton() {
  const { theme } = useTheme();
  const [isImporting, setIsImporting] = useState(false);
  const { showToast } = useToast();

  const showFirstConfirmation = () => {
    Alert.alert(
      'Cảnh báo Reset Database',
      'Hành động này sẽ xóa toàn bộ dữ liệu recipes và hình ảnh hiện tại, sau đó import lại từ đầu. Bạn có chắc chắn muốn tiếp tục?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Tiếp tục',
          style: 'destructive',
          onPress: showSecondConfirmation,
        },
      ]
    );
  };

  const showSecondConfirmation = () => {
    Alert.alert(
      'Xác nhận lần cuối',
      'Đây là thao tác không thể hoàn tác. Tất cả dữ liệu recipes và hình ảnh sẽ bị reset. Bạn thực sự muốn tiếp tục?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Reset & Import',
          style: 'destructive',
          onPress: handleImportData,
        },
      ]
    );
  };

  const handleImportData = async () => {
    setIsImporting(true);
    try {
      const batch = writeBatch(db);

      // 1. Lấy danh sách tất cả recipeStats hiện tại
      const statsSnapshot = await getDocs(
        collection(db, COLLECTIONS.RECIPE_STATS)
      );
      const existingStatsIds = new Set(statsSnapshot.docs.map((doc) => doc.id));

      // 2. Tạo Set chứa ID của tất cả recipes sẽ import
      const newRecipeIds = new Set();

      // 3. Import regions và recipes
      for (const region of regions) {
        const { recipes: regionRecipes, ...regionData } = region;

        const regionRef = doc(db, COLLECTIONS.REGIONS, region.id);
        batch.set(regionRef, {
          ...regionData,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });

        for (const recipe of regionRecipes) {
          newRecipeIds.add(recipe.id);

          const recipeRef = doc(db, COLLECTIONS.RECIPES, recipe.id);
          batch.set(recipeRef, {
            ...recipe,
            regionId: region.id,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
          });

          // Chỉ tạo mới recipeStats nếu chưa tồn tại
          if (!existingStatsIds.has(recipe.id)) {
            const recipeStatsRef = doc(db, COLLECTIONS.RECIPE_STATS, recipe.id);
            batch.set(recipeStatsRef, {
              recipeId: recipe.id,
              averageRating: 0,
              totalReviews: 0,
              createdAt: Timestamp.now(),
              updatedAt: Timestamp.now(),
            });
          }
        }
      }

      // 4. Xóa recipeStats của những recipe không còn tồn tại
      for (const statsId of existingStatsIds) {
        if (!newRecipeIds.has(statsId)) {
          const statsRef = doc(db, COLLECTIONS.RECIPE_STATS, statsId);
          batch.delete(statsRef);
        }
      }

      await batch.commit();
      showToast('success', 'Đã import và đồng bộ dữ liệu');
    } catch (error) {
      console.error('Lỗi khi import dữ liệu:', error);
      showToast('error', 'Có lỗi xảy ra khi import dữ liệu');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[
          {
            backgroundColor: theme.colors.primary.main,
            padding: theme.spacing.md,
            borderRadius: theme.spacing.sm,
            alignItems: 'center',
            ...theme.shadows.sm,
          },
        ]}
        onPress={showFirstConfirmation}
        disabled={isImporting}
      >
        <Typography
          variant="body1"
          style={{ color: theme.colors.primary.contrast }}
        >
          Import Dữ Liệu
        </Typography>
      </TouchableOpacity>

      <Modal transparent={true} visible={isImporting} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.background.paper,
              padding: theme.spacing.lg,
              borderRadius: theme.spacing.md,
              alignItems: 'center',
              ...theme.shadows.md,
            }}
          >
            <ActivityIndicator size="large" color={theme.colors.primary.main} />
            <Typography variant="body1" style={{ marginTop: theme.spacing.md }}>
              Đang import dữ liệu...
            </Typography>
          </View>
        </View>
      </Modal>
    </>
  );
}
