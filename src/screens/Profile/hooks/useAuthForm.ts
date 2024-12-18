import { useState } from 'react';
import { useToast } from '../../../hooks/useToast';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '../../../config/firebase';

export const useAuthForm = (
  login: (email: string, password: string) => Promise<void>,
  register: (email: string, password: string) => Promise<void>,
  resetPassword: (email: string) => Promise<void>
) => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateEmail = (email: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setErrors((prev) => ({
      ...prev,
      email: isValid ? '' : 'Email không hợp lệ',
    }));
    return isValid;
  };

  const validatePassword = (password: string) => {
    const isValid = password.length >= 6;
    setErrors((prev) => ({
      ...prev,
      password: isValid ? '' : 'Mật khẩu phải có ít nhất 6 ký tự',
    }));
    return isValid;
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ) => {
    const isValid = password === confirmPassword;
    setErrors((prev) => ({
      ...prev,
      confirmPassword: isValid ? '' : 'Mật khẩu nhập lại không khớp',
    }));
    return isValid;
  };

  const handleResetPassword = async () => {
    try {
      if (!validateEmail(resetEmail)) {
        showToast('error', 'Email không hợp lệ');
        return;
      }

      await resetPassword(resetEmail);
      showToast('success', 'Vui lòng kiểm tra email để đặt lại mật khẩu');
      setShowResetPassword(false);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        showToast('error', 'Email này chưa được đăng ký');
      } else {
        showToast('error', error.message);
      }
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
    handleResetPassword,
  };
};
