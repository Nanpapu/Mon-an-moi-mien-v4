import React, { useState } from "react";
import { View, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { styles } from "./styles";
import { useAuthAnimation } from "./hooks/useAuthAnimation";
import { useProfileActions } from "./hooks/useProfileActions";
import { useAuthForm } from "./hooks/useAuthForm";
import { UserProfile } from "./components/UserProfile";
import { AuthForm } from "./components/AuthForm";
import { ResetPasswordModal } from "./components/ResetPasswordModal";
import { GoogleSignInButton } from "./components/GoogleSignInButton";

export default function ProfileScreen() {
  // Auth context
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

  // Handlers
  const handleLogin = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isRegistering) {
      const isConfirmPasswordValid = validateConfirmPassword(
        password,
        confirmPassword
      );
      if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) return;
    } else {
      if (!isEmailValid || !isPasswordValid) return;
    }

    try {
      if (isRegistering) {
        await register(email, password);
        Alert.alert("Thành công", "Đăng ký tài khoản thành công");
      } else {
        await login(email, password);
        Alert.alert("Thành công", "Đăng nhập thành công");
      }
    } catch (error: any) {
      Alert.alert("Lỗi", error.message);
    }
  };

  const toggleAuthMode = () => {
    setIsRegistering(!isRegistering);
    animateFormTransition();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {user ? (
        <UserProfile
          user={user}
          displayName={displayName}
          isEditing={isEditing}
          onDisplayNameChange={setDisplayName}
          onEditPress={() => setIsEditing(true)}
          onSavePress={handleSaveProfile}
          onCancelPress={() => setIsEditing(false)}
          onPickImage={pickImage}
          onLogout={logout}
          onImportData={
            user.email === ("21521059@gm.uit.edu.vn") ? handleImportData : undefined
          }
        />
      ) : (
        <View style={styles.container}>
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
        </View>
      )}

      <ResetPasswordModal
        visible={showResetPassword}
        email={resetEmail}
        onEmailChange={setResetEmail}
        onClose={() => setShowResetPassword(false)}
        onSubmit={handleResetPassword}
      />
    </KeyboardAvoidingView>
  );
}
