import { useState } from 'react';
import { Alert } from 'react-native';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '../../../config/firebase';

export const useAuthForm = (
  login: (email: string, password: string) => Promise<void>,
  register: (email: string, password: string) => Promise<void>,
  resetPassword: (email: string) => Promise<void>
) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateEmail = (email: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setErrors(prev => ({
      ...prev,
      email: isValid ? '' : 'Email không hợp lệ'
    }));
    return isValid;
  };

  const validatePassword = (password: string) => {
    const isValid = password.length >= 6;
    setErrors(prev => ({
      ...prev,
      password: isValid ? '' : 'Mật khẩu phải có ít nhất 6 ký tự'
    }));
    return isValid;
  };

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    const isValid = password === confirmPassword;
    setErrors(prev => ({
      ...prev,
      confirmPassword: isValid ? '' : 'Mật khẩu nhập lại không khớp'
    }));
    return isValid;
  };

  const handleResetPassword = async () => {
    try {
      if (!validateEmail(resetEmail)) {
        Alert.alert("Lỗi", "Email không hợp lệ");
        return;
      }

      const methods = await fetchSignInMethodsForEmail(auth, resetEmail);
      if (methods.length === 0) {
        Alert.alert("Lỗi", "Email này chưa được đăng ký");
        return;
      }

      await resetPassword(resetEmail);
      Alert.alert(
        "Thành công",
        "Vui lòng kiểm tra email để đặt lại mật khẩu"
      );
      setShowResetPassword(false);
    } catch (error: any) {
      Alert.alert("Lỗi", error.message);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    resetEmail,
    setResetEmail,
    showResetPassword,
    setShowResetPassword,
    errors,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    handleResetPassword
  };
};
