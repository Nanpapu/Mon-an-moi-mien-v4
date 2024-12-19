import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Card, Typography, Button, Input } from '../../../components/shared';
import { useTheme } from '../../../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { User } from 'firebase/auth';
import { ThemeSelector } from './ThemeSelector';

interface Props {
  user: User;
  displayName: string;
  isEditing: boolean;
  onDisplayNameChange: (value: string) => void;
  onEditPress: () => void;
  onSavePress: () => void;
  onCancelPress: () => void;
  onPickImage: () => void;
  onLogout: () => void;
  onImportData?: () => void;
  photoURL?: string;
  isUploading?: boolean;
  isImporting: boolean;
}

export const UserProfile = ({
  user,
  displayName,
  isEditing,
  onDisplayNameChange,
  onEditPress,
  onSavePress,
  onCancelPress,
  onPickImage,
  onLogout,
  onImportData,
  photoURL,
  isUploading,
  isImporting,
}: Props) => {
  const { theme } = useTheme();

  return (
    <Card style={{ padding: theme.spacing.lg }}>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={onPickImage}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: theme.colors.background.paper,
              ...theme.shadows.md,
              marginBottom: theme.spacing.md,
            }}
          >
            {photoURL ? (
              <Image
                source={{ uri: photoURL }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 50,
                }}
              />
            ) : (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons
                  name="person"
                  size={40}
                  color={theme.colors.text.secondary}
                />
              </View>
            )}
          </View>
        </TouchableOpacity>

        {isEditing ? (
          <View style={{ width: '100%' }}>
            <Input
              value={displayName}
              onChangeText={onDisplayNameChange}
              placeholder="Nhập tên hiển thị"
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: theme.spacing.sm,
              }}
            >
              <Button variant="outline" onPress={onCancelPress}>
                Hủy
              </Button>
              <Button onPress={onSavePress}>Lưu</Button>
            </View>
          </View>
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Typography variant="h3" style={{ marginBottom: theme.spacing.xs }}>
              {displayName || 'Người dùng'}
            </Typography>
            <Typography
              variant="body2"
              color="secondary"
              style={{ marginBottom: theme.spacing.md }}
            >
              {user?.email}
            </Typography>
            <Button
              variant="outline"
              icon="create-outline"
              onPress={onEditPress}
            >
              Chỉnh sửa thông tin
            </Button>
          </View>
        )}

        <View style={{ width: '100%', marginTop: theme.spacing.xl }}>
          <ThemeSelector />
        </View>

        <Button
          variant="secondary"
          icon="log-out-outline"
          onPress={onLogout}
          style={{ marginTop: theme.spacing.lg }}
        >
          Đăng xuất
        </Button>

        {user?.email === '21521059@gm.uit.edu.vn' && onImportData && (
          <Button
            variant="outline"
            icon="cloud-upload-outline"
            onPress={onImportData}
            disabled={isImporting}
            style={{ marginTop: theme.spacing.md }}
          >
            {isImporting ? 'Đang Import...' : 'Import Dữ Liệu'}
          </Button>
        )}
      </View>
    </Card>
  );
};
