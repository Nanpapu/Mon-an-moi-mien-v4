import { db, storage } from "../config/firebase";
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const UserService = {
  updateProfile: async (
    userId: string,
    data: {
      displayName?: string;
      photoURL?: string;
    }
  ) => {
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
  },

  createUserDocument: async (userId: string, email: string) => {
    try {
      await setDoc(doc(db, "users", userId), {
        email: email,
        displayName: "",
        photoURL: "",
        createdAt: new Date(),
      });
      return true;
    } catch (error) {
      console.error("Lỗi khi tạo user document:", error);
      return false;
    }
  },

  getUserInfo: async (userId: string) => {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          displayName: userData.displayName || "Người dùng",
          email: maskEmail(userData.email),
          photoURL: userData.photoURL
        };
      }
      return null;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin user:", error);
      return null;
    }
  },
};

// Hàm để ẩn một phần email
const maskEmail = (email: string) => {
  const [username, domain] = email.split('@');
  const maskedUsername = username.slice(0, 3) + '*'.repeat(username.length - 3);
  return `${maskedUsername}@${domain}`;
};
