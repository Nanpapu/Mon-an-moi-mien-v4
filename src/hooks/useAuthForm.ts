import { useState } from 'react';

export const useAuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    validateEmail,
    validatePassword,
    validateConfirmPassword
  };
};
