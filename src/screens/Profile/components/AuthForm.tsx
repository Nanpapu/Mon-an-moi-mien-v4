import React from "react";
import { View, Animated } from "react-native";
import { Input, Button, Typography } from "../../../components/shared";
import { useTheme } from "../../../theme/ThemeContext";

interface Props {
  isRegistering: boolean;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  errors: any;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onConfirmPasswordChange: (text: string) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
  onSubmit: () => void;
  onForgotPassword: () => void;
  onToggleAuthMode: () => void;
}

export const AuthForm = ({
  isRegistering,
  email,
  password,
  confirmPassword,
  showPassword,
  showConfirmPassword,
  errors,
  fadeAnim,
  slideAnim,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onSubmit,
  onForgotPassword,
  onToggleAuthMode,
}: Props) => {
  const { theme } = useTheme();

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          {
            translateX: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -30],
            }),
          },
        ],
        width: "100%",
      }}
    >
      <Typography variant="h2" style={{ marginBottom: theme.spacing.lg }}>
        {isRegistering ? "Đăng ký" : "Đăng nhập"}
      </Typography>

      <Input
        label="Email"
        value={email}
        onChangeText={onEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
        leftIcon="mail-outline"
        error={errors.email}
        placeholder="Nhập email của bạn"
      />

      <Input
        label="Mật khẩu"
        value={password}
        onChangeText={onPasswordChange}
        secureTextEntry={!showPassword}
        leftIcon="lock-closed-outline"
        rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
        onRightIconPress={onTogglePassword}
        error={errors.password}
        placeholder="Nhập mật khẩu"
      />

      {isRegistering && (
        <Input
          label="Xác nhận mật khẩu"
          value={confirmPassword}
          onChangeText={onConfirmPasswordChange}
          secureTextEntry={!showConfirmPassword}
          leftIcon="lock-closed-outline"
          rightIcon={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
          onRightIconPress={onToggleConfirmPassword}
          error={errors.confirmPassword}
          placeholder="Nhập lại mật khẩu"
        />
      )}

      <Button onPress={onSubmit} style={{ marginTop: theme.spacing.md }}>
        {isRegistering ? "Đăng ký" : "Đăng nhập"}
      </Button>

      {!isRegistering && (
        <Button
          variant="text"
          onPress={onForgotPassword}
          style={{ marginTop: theme.spacing.sm }}
        >
          Quên mật khẩu?
        </Button>
      )}

      <Button
        variant="outline"
        onPress={onToggleAuthMode}
        style={{ marginTop: theme.spacing.lg }}
      >
        {isRegistering
          ? "Đã có tài khoản? Đăng nhập"
          : "Chưa có tài khoản? Đăng ký"}
      </Button>
    </Animated.View>
  );
};
