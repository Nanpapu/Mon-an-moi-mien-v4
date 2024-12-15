import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Animated } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { styles } from '../styles';

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
  onToggleAuthMode
}: Props) => {
  return (
    <Animated.View 
      style={[
        styles.formContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={24} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={onEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={24} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={onPasswordChange}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={onTogglePassword}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#666"
          />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      {isRegistering && (
        <>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed" size={24} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChangeText={onConfirmPasswordChange}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={onToggleConfirmPassword}>
              <Ionicons
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>
          {isRegistering ? "Đăng ký" : "Đăng nhập"}
        </Text>
      </TouchableOpacity>

      {!isRegistering && (
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={onForgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.switchAuthButton}
        onPress={onToggleAuthMode}
      >
        <Text style={styles.switchAuthText}>
          {isRegistering
            ? "Đã có tài khoản? Đăng nhập"
            : "Chưa có tài khoản? Đăng ký"}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
