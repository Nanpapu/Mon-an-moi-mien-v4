import { db, storage } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const UserService = {
  // Cập nhật tên hiển thị
  updateDisplayName: async (uid: string, displayName: string) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, { displayName });
  },

  // Upload và cập nhật avatar
  updateAvatar: async (uid: string, imageUri: string) => {
    // Upload ảnh lên Storage
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const avatarRef = ref(storage, `avatars/${uid}`);
    await uploadBytes(avatarRef, blob);

    // Lấy URL và cập nhật vào Firestore
    const photoURL = await getDownloadURL(avatarRef);
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, { photoURL });
    
    return photoURL;
  }
};
