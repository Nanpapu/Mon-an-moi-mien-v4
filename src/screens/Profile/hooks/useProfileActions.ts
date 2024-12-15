import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { UserService } from "../../../services/userService";
import { RegionService } from "../../../services/regionService";
import { User } from "firebase/auth";

export const useProfileActions = (user: User | null) => {
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [isEditing, setIsEditing] = useState(false);

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

  return {
    displayName,
    setDisplayName,
    isEditing,
    setIsEditing,
    handleImportData,
    pickImage,
    handleSaveProfile,
    handleCreateUserDocument,
  };
};
