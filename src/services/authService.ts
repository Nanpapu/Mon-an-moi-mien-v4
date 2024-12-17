import { auth, db } from '../config/firebase';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

/**
 * Service xử lý xác thực người dùng
 * @module AuthService
 */

export const AuthService = {
  /**
   * Đăng nhập người dùng với email và mật khẩu
   * @param {string} email - Email của người dùng
   * @param {string} password - Mật khẩu của người dùng
   * @returns {Promise<User>} Thông tin người dùng sau khi đăng nhập
   * @throws {Error} Lỗi khi đăng nhập thất bại
   */
  login: async (email: string, password: string): Promise<User> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Đăng ký
  register: async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Tạo document user trong Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: userCredential.user.email,
        displayName: '',
        photoURL: '',
        createdAt: new Date()
      });

      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Đăng xuất
  logout: async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Lấy user hiện tại
  getCurrentUser: (): User | null => {
    return auth.currentUser;
  }
}; 