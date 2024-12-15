import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

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
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Đặt lại mật khẩu</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập email của bạn"
            value={email}
            onChangeText={onEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#ff6b6b' }]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={onSubmit}
            >
              <Text style={styles.buttonText}>Gửi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
