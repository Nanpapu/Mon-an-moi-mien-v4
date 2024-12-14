// Component màn hình Tài khoản
// Xử lý đăng nhập, đăng xuất và quên mật khẩu
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { ImportButton } from "../components/ImportButton";
import { RegionService } from "../services/regionService";
import * as ImagePicker from "expo-image-picker";
import { UserService } from "../services/userService";
import { useAuthForm } from "../hooks/useAuthForm";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../config/firebase";

export default function ProfileScreen() {
  // HOOKS & STATE
  const { login, isLoading, user, logout, register, resetPassword } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [isEditing, setIsEditing] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  // Animation
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(0)).current;

  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
  } = useAuthForm();

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isRegistering]);

  // Animation khi chuyển form
  const animateFormTransition = () => {
    // Reset về 0
    fadeAnim.setValue(0);
    slideAnim.setValue(40);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // HANDLERS
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

  const handleImportData = async () => {
    try {
      const success = await RegionService.importDataToFirestore();
      if (success) {
        Alert.alert("Thành công", "Đã import dữ liệu vào Firestore");
      } else {
        Alert.alert("Lỗi", "Không thể import dữ liệu");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Có lỗi xảy ra khi import dữ liệu");
    }
  };

  // Hàm chọn ảnh từ thư viện
  const pickImage = async () => {
    if (!user) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      try {
        const downloadURL = await UserService.uploadAvatar(
          user.uid,
          result.assets[0].uri
        );
        if (downloadURL) {
          Alert.alert("Thành công", "Đã cập nhật ảnh đại diện");
        }
      } catch (error) {
        Alert.alert("Lỗi", "Không thể cập nhật ảnh đại diện");
      }
    }
  };

  // Hàm lưu thông tin profile
  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      const success = await UserService.updateProfile(user.uid, {
        displayName,
      });
      if (success) {
        Alert.alert("Thành công", "Đã cập nhật thông tin");
        setIsEditing(false);
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể cập nhật thông tin");
    }
  };

  // Thêm hàm xử lý
  const handleCreateUserDocument = async () => {
    if (!user) return;
    try {
      const success = await UserService.createUserDocument(
        user.uid,
        user.email || ""
      );
      if (success) {
        Alert.alert("Thành công", "Đã tạo thông tin người dùng");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tạo thông tin người dùng");
    }
  };

  // Thêm validation realtime
  const handleEmailChange = (text: string) => {
    setEmail(text);
    validateEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validatePassword(text);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    validateConfirmPassword(password, text);
  };

  // Sửa lại hàm chuyển form
  const toggleAuthMode = () => {
    setIsRegistering(!isRegistering);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    animateFormTransition();
  };

  // Thêm handler
  const handleResetPassword = async () => {
    try {
      if (!validateEmail(resetEmail)) {
        Alert.alert("Lỗi", "Email không hợp lệ");
        return;
      }

      // Kiểm tra email có tồn tại trong auth không
      const methods = await fetchSignInMethodsForEmail(auth, resetEmail);
      if (methods.length === 0) {
        Alert.alert("Lỗi", "Email này chưa được đăng ký");
        return;
      }

      await resetPassword(resetEmail);
      Alert.alert(
        "Thành công",
        "Email khôi phục mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư."
      );
      setShowResetPassword(false);
    } catch (error: any) {
      Alert.alert("Lỗi", "Có lỗi xảy ra khi gửi email khôi phục");
    }
  };

  // RENDER
  if (user) {
    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.userInfoContainer}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity
              onPress={pickImage}
              style={styles.avatarContainer}
            >
              {user?.photoURL ? (
                <Image source={{ uri: user.photoURL }} style={styles.avatar} />
              ) : (
                <Ionicons name="person-circle" size={80} color="#007AFF" />
              )}
              <View style={styles.editIconContainer}>
                <Ionicons name="camera" size={20} color="white" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.nameContainer}>
            {isEditing ? (
              <>
                <TextInput
                  style={styles.nameInput}
                  value={displayName}
                  onChangeText={setDisplayName}
                  placeholder="Nhập tên hiển thị"
                />
                <View style={styles.editButtonsContainer}>
                  <TouchableOpacity
                    style={[styles.editButton, styles.cancelButton]}
                    onPress={() => {
                      setIsEditing(false);
                      setDisplayName(user?.displayName || displayName);
                    }}
                  >
                    <Ionicons name="close-outline" size={20} color="white" />
                    <Text style={styles.buttonText}>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.editButton, styles.saveButton]}
                    onPress={handleSaveProfile}
                  >
                    <Ionicons
                      name="checkmark-outline"
                      size={20}
                      color="white"
                    />
                    <Text style={styles.buttonText}>Lưu</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.displayNameText}>
                  {displayName || "Chưa có tên hiển thị"}
                </Text>
                <TouchableOpacity
                  style={styles.editNameButton}
                  onPress={() => setIsEditing(true)}
                >
                  <Ionicons name="pencil" size={18} color="#007AFF" />
                </TouchableOpacity>
              </>
            )}
          </View>

          <Text style={styles.emailText}>{user.email}</Text>

          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Ionicons name="log-out-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.importButton}
            onPress={handleImportData}
          >
            <Ionicons name="cloud-upload-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Import Data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.importButton}
            onPress={handleCreateUserDocument}
          >
            <Ionicons name="person-add-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Tạo thông tin người dùng</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.formContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.title}>
          {isRegistering ? "Đăng ký" : "Đăng nhập"}
        </Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={24} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        {isRegistering && (
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>
              {isRegistering ? "Đăng ký" : "Đăng nhập"}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchAuthButton}
          onPress={toggleAuthMode}
        >
          <Text style={styles.switchAuthText}>
            {isRegistering ? "Đã có tài khoản? " : "Chưa có tài khoản? "}
            <Text style={styles.switchAuthHighlight}>
              {isRegistering ? "Đăng nhập" : "Đăng ký"}
            </Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => setShowResetPassword(true)}
        >
          <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </Animated.View>

      <Modal
        visible={showResetPassword}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Khôi phục mật khẩu</Text>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={24} color="#666" />
              <TextInput
                style={styles.input}
                placeholder="Nhập email của bạn"
                value={resetEmail}
                onChangeText={setResetEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowResetPassword(false)}
              >
                <Text style={styles.buttonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleResetPassword}
              >
                <Text style={styles.buttonText}>Gửi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },

  formContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  userInfoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#333",
  },

  emailText: {
    fontSize: 18,
    color: "#007AFF",
    fontWeight: "600",
  },

  actionsContainer: {
    marginTop: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    height: 55,
  },

  input: {
    flex: 1,
    padding: 12,
    marginLeft: 10,
    fontSize: 16,
  },

  eyeIcon: {
    padding: 10,
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonDisabled: {
    backgroundColor: "#99c9ff",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  logoutButton: {
    backgroundColor: "#ff4444",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginTop: 15,
  },

  switchAuthButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  switchAuthText: {
    fontSize: 15,
    color: "#666",
  },

  switchAuthHighlight: {
    color: "#007AFF",
    fontWeight: "bold",
  },

  importButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginTop: 15,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  editIconContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#007AFF",
    borderRadius: 15,
    padding: 5,
  },

  infoContainer: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },

  displayName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },

  email: {
    color: "#666",
  },

  nameContainer: {
    alignItems: "center",
    marginVertical: 15,
    width: "100%",
  },

  nameInput: {
    width: "80%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "white",
    marginBottom: 10,
  },

  editButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    width: "80%",
  },

  editButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 90,
    justifyContent: "center",
  },

  cancelButton: {
    backgroundColor: "#ff6b6b",
  },

  saveButton: {
    backgroundColor: "#4CAF50",
  },

  editNameButton: {
    marginLeft: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },

  displayNameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },

  forgotPasswordButton: {
    marginTop: 10,
    alignItems: "center",
  },

  forgotPasswordText: {
    color: "#007AFF",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },

  confirmButton: {
    backgroundColor: "#4CAF50",
  },
});
