import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { User } from "firebase/auth";
import { styles } from "../styles";
import { IMAGES } from "../../../constants/assets";

interface Props {
  user: User;
  displayName: string;
  isEditing: boolean;
  onDisplayNameChange: (text: string) => void;
  onEditPress: () => void;
  onSavePress: () => void;
  onCancelPress: () => void;
  onPickImage: () => void;
  onLogout: () => void;
  onImportData?: () => void;
}

export const UserProfile = ({
  user,
  displayName,
  isEditing,
  onDisplayNameChange,
  onEditPress,
  onSavePress,
  onCancelPress,
  onPickImage,
  onLogout,
  onImportData,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <TouchableOpacity onPress={onPickImage}>
          <View>
            <Image
              source={
                user?.photoURL ? { uri: user.photoURL } : IMAGES.defaultAvatar
              }
              style={styles.avatar}
            />
            <View style={styles.editIconContainer}>
              <Ionicons name="camera" size={20} color="white" />
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.nameContainer}>
          {isEditing ? (
            <>
              <TextInput
                style={styles.nameInput}
                value={displayName}
                onChangeText={onDisplayNameChange}
                placeholder="Nhập tên hiển thị"
              />
              <View style={styles.editButtonsContainer}>
                <TouchableOpacity
                  style={[styles.editButton, styles.cancelButton]}
                  onPress={onCancelPress}
                >
                  <Text style={styles.buttonText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.editButton, styles.saveButton]}
                  onPress={onSavePress}
                >
                  <Text style={styles.buttonText}>Lưu</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.displayNameText}>{displayName}</Text>
              <TouchableOpacity
                style={styles.editNameButton}
                onPress={onEditPress}
              >
                <Ionicons name="pencil" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <Text style={styles.email}>{user?.email}</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.buttonText}>Đăng xuất</Text>
        </TouchableOpacity>

        {user.email === "21521059@gm.uit.edu.vn" && onImportData && (
          <TouchableOpacity style={styles.importButton} onPress={onImportData}>
            <Text style={styles.buttonText}>Import Dữ Liệu</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
