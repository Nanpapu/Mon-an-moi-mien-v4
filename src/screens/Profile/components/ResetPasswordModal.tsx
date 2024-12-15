import React from 'react';
import { View, TextInput } from 'react-native';
import { Modal, Typography, Button } from '../../../components/shared';
import { useTheme } from '../../../theme/ThemeContext';

interface Props {
  visible: boolean;
  email: string;
  onEmailChange: (text: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export const ResetPasswordModal = ({
  visible,
  email,
  onEmailChange,
  onClose,
  onSubmit
}: Props) => {
  const { theme } = useTheme();

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      style={{ margin: theme.spacing.lg }}
    >
      <View style={{ padding: theme.spacing.lg }}>
        <Typography 
          variant="h3" 
          style={{ marginBottom: theme.spacing.lg }}
        >
          Đặt lại mật khẩu
        </Typography>

        <TextInput
          style={{
            borderWidth: 1,
            borderColor: theme.colors.divider,
            borderRadius: theme.spacing.sm,
            padding: theme.spacing.md,
            marginBottom: theme.spacing.lg,
            color: theme.colors.text.primary,
            backgroundColor: theme.colors.background.default,
          }}
          placeholder="Nhập email của bạn"
          placeholderTextColor={theme.colors.text.secondary}
          value={email}
          onChangeText={onEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'flex-end',
          gap: theme.spacing.md
        }}>
          <Button
            variant="outline"
            onPress={onClose}
            style={{ flex: 1 }}
          >
            Hủy
          </Button>
          <Button
            variant="primary"
            onPress={onSubmit}
            style={{ flex: 1 }}
          >
            Gửi
          </Button>
        </View>
      </View>
    </Modal>
  );
};
