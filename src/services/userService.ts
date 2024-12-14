import { db, storage } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const UserService = {
  updateProfile: async (userId: string, data: {
    displayName?: string;
    photoURL?: string;
  }) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, data);
      return true;
    } catch (error) {
      console.error("Lỗi khi cập nhật profile:", error);
      return false;
    }
  },

  uploadAvatar: async (userId: string, imageUri: string) => {
    try {
      // Tạo reference đến storage
      const storageRef = ref(storage, `avatars/${userId}`);
      
      // Convert imageUri thành blob
      const response = await fetch(imageUri);
      const blob = await response.blob();
      
      // Upload file
      await uploadBytes(storageRef, blob);
      
      // Lấy URL download
      const downloadURL = await getDownloadURL(storageRef);
      
      // Cập nhật photoURL trong profile
      await UserService.updateProfile(userId, { photoURL: downloadURL });
      
      return downloadURL;
    } catch (error) {
      console.error("Lỗi khi upload avatar:", error);
      return null;
    }
  }
};
