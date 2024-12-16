import React, { useState } from 'react';
import { TouchableOpacity, Modal, View, ActivityIndicator, Alert } from 'react-native';
import { Typography } from '../shared';
import { useTheme } from '../../theme/ThemeContext';
import { RegionService } from '../../services/regionService';

export function ImportButton() {
  const { theme } = useTheme();
  const [isImporting, setIsImporting] = useState(false);

  const handleImportData = async () => {
    setIsImporting(true);
    try {
      const success = await RegionService.importDataToFirestore();
      if (success) {
        Alert.alert('Thành công', 'Đã import dữ liệu vào Firestore');
      } else {
        Alert.alert('Lỗi', 'Không thể import dữ liệu');
      }
    } catch (error) {
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
