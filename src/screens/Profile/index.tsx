import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Loading, Typography } from '../../components/shared';
import { AuthForm } from './components/AuthForm';
import { UserProfile } from './components/UserProfile';
import { GoogleSignInButton } from './components/GoogleSignInButton';
import { useAuth } from '../../context/AuthContext';
import { useAuthForm } from './hooks/useAuthForm';
import { useAuthAnimation } from './hooks/useAuthAnimation';
import { useProfileActions } from './hooks/useProfileActions';
import { ResetPasswordModal } from './components/ResetPasswordModal';
import { useToast } from '../../hooks/useToast';

export default function ProfileScreen() {
  const { theme } = useTheme();
  const {
    login,
    isLoading,
    user,
    logout,
    register,
    resetPassword,
    signInWithGoogle,
  } = useAuth();

  // Local state
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Custom hooks
  const { fadeAnim, slideAnim, animateFormTransition } =
    useAuthAnimation(isRegistering);
  const {
    displayName,
    setDisplayName,
    isEditing,
    setIsEditing,
    handleImportData,
    pickImage,
    handleSaveProfile,
    handleStartEditing,
    handleCancelEditing,
  } = useProfileActions(user);

  const {
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
  } = useAuthForm(login, register, resetPassword);

  const { showToast } = useToast();

  // Handlers
  const handleLogin = async () => {
    try {
      await login(email, password);
      showToast('success', 'Đăng nhập thành công');
    } catch (error: any) {
      showToast('error', 'Đăng nhập thất bại: ' + error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await register(email, password);
      showToast('success', 'Đăng ký thành công');
    } catch (error: any) {
      showToast('error', 'Đăng ký thất bại: ' + error.message);
    }
  };

  const toggleAuthMode = () => {
    setIsRegistering(!isRegistering);
    animateFormTransition();
  };

  const handleLogout = async () => {
    try {
      await logout();
      showToast('success', 'Đã đăng xuất');
    } catch (error: any) {
      showToast('error', 'Đăng xuất thất bại');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background.default,
        padding: theme.spacing.lg,
      }}
    >
      {isLoading ? (
        <Loading text="Đang tải..." />
      ) : user ? (
        <UserProfile
          user={user}
          displayName={displayName}
          isEditing={isEditing}
          onDisplayNameChange={setDisplayName}
          onEditPress={handleStartEditing}
          onSavePress={handleSaveProfile}
          onCancelPress={handleCancelEditing}
          onPickImage={pickImage}
          onLogout={handleLogout}
          onImportData={
            user.email === '21521059@gm.uit.edu.vn'
              ? handleImportData
              : undefined
          }
        />
      ) : (
        <>
          <AuthForm
            isRegistering={isRegistering}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            errors={errors}
            fadeAnim={fadeAnim}
            slideAnim={slideAnim}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            onToggleConfirmPassword={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            onSubmit={handleLogin}
            onForgotPassword={() => setShowResetPassword(true)}
            onToggleAuthMode={toggleAuthMode}
          />
          <GoogleSignInButton onPress={signInWithGoogle} />
          <ResetPasswordModal
            visible={showResetPassword}
            email={resetEmail}
            onEmailChange={setResetEmail}
            onClose={() => setShowResetPassword(false)}
            onSubmit={handleResetPassword}
          />
        </>
      )}
    </View>
  );
}
