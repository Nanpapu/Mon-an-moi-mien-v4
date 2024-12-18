import { useState, useEffect } from 'react';
import { useToast } from '../../../hooks/useToast';
import * as ImagePicker from 'expo-image-picker';
import { UserService } from '../../../services/userService';
import { RegionService } from '../../../services/regionService';
import { User } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import { updateProfile } from 'firebase/auth';

export const useProfileActions = (user: User | null) => {
  const { showToast } = useToast();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [isEditing, setIsEditing] = useState(false);
  const [originalDisplayName, setOriginalDisplayName] = useState(
    user?.displayName || ''
  );
  const [isUploading, setIsUploading] = useState(false);
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const userData = await UserService.getUserData(user.uid);
        if (userData && userData.displayName) {
          setDisplayName(userData.displayName);
          setOriginalDisplayName(userData.displayName);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleStartEditing = () => {
    setOriginalDisplayName(displayName);
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setDisplayName(originalDisplayName);
    setIsEditing(false);
  };

  const handleImportData = async () => {
    try {
      const success = await RegionService.importDataToFirestore();
      if (success) {
        showToast('success', 'Đã import dữ liệu vào Firestore');
      } else {
        showToast('error', 'Không thể import dữ liệu');
      }
    } catch (error) {
      showToast('error', 'Có lỗi xảy ra khi import dữ liệu');
    }
  };

  const pickImage = async () => {
    if (!user) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        setIsUploading(true);
        try {
          const downloadURL = await UserService.uploadAvatar(
            user.uid,
            result.assets[0].uri
          );
          if (downloadURL) {
            setPhotoURL(downloadURL);
            await updateProfile(auth.currentUser!, {
              photoURL: downloadURL,
            });
            showToast('success', 'Đã cập nhật ảnh đại diện');
          }
        } catch (error) {
          showToast('error', 'Không thể cập nhật ảnh đại diện');
        } finally {
          setIsUploading(false);
        }
      }
    } catch (error) {
      showToast('error', 'Không thể chọn ảnh');
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      const success = await UserService.updateProfile(user.uid, {
        displayName,
      });
      if (success) {
        showToast('success', 'Đã cập nhật thông tin');
        setIsEditing(false);
      }
    } catch (error) {
      showToast('error', 'Không thể cập nhật thông tin');
    }
  };

  const handleCreateUserDocument = async () => {
    if (!user) return;
    try {
      const success = await UserService.createUserDocument(
        user.uid,
        user.email || ''
      );
      if (success) {
        showToast('success', 'Đã tạo thông tin người dùng');
      }
    } catch (error) {
      showToast('error', 'Không thể tạo thông tin người dùng');
    }
  };

  return {
    displayName,
    setDisplayName,
    isEditing,
    setIsEditing,
    handleStartEditing,
    handleCancelEditing,
    handleImportData,
    pickImage,
    handleSaveProfile,
    handleCreateUserDocument,
    isUploading,
    photoURL,
  };
};
