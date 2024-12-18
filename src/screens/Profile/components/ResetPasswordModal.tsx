import React from 'react';
import { View } from 'react-native';
import { Modal, Typography, Input, Button } from '../../../components/shared';
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
  onSubmit,
}: Props) => {
  const { theme } = useTheme();

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      style={{ margin: theme.spacing.lg }}
    >
      <View
        style={{
          padding: theme.spacing.lg,
          backgroundColor: theme.colors.background.paper,
          borderRadius: theme.spacing.md,
          ...theme.shadows.md,
        }}
      >
        <Typography variant="h3" style={{ marginBottom: theme.spacing.lg }}>
          Đặt lại mật khẩu
        </Typography>

        <Input
          value={email}
          onChangeText={onEmailChange}
          placeholder="Nhập email của bạn"
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon="mail-outline"
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: theme.spacing.md,
            marginTop: theme.spacing.lg,
          }}
        >
          <Button variant="outline" onPress={onClose} style={{ flex: 1 }}>
            Hủy
          </Button>
          <Button variant="primary" onPress={onSubmit} style={{ flex: 1 }}>
            Gửi
          </Button>
        </View>
      </View>
    </Modal>
  );
};
