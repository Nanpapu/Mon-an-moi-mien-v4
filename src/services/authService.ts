/**
 * @fileoverview Service xử lý xác thực người dùng trong ứng dụng
 */

import { auth, db } from '../config/firebase';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

/**
 * Service xử lý các chức năng liên quan đến authentication
 * @module AuthService
 */
export const AuthService = {
  /**
   * Đăng nhập người dùng với email và mật khẩu
   * @param {string} email - Email của người dùng
   * @param {string} password - Mật khẩu của người dùng
   * @returns {Promise<User>} Thông tin người dùng sau khi đăng nhập thành công
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

  /**
   * Đăng ký tài khoản mới
   * @param {string} email - Email đăng ký
   * @param {string} password - Mật khẩu đăng ký
   * @returns {Promise<User>} Thông tin người dùng sau khi đăng ký thành công
   * @throws {Error} Lỗi khi đăng ký thất bại
   */
  register: async (email: string, password: string): Promise<User> => {
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

  /**
   * Đăng xuất người dùng hiện tại
   * @returns {Promise<void>}
   * @throws {Error} Lỗi khi đăng xuất thất bại
   */
  logout: async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  /**
   * Lấy thông tin người dùng hiện tại
   * @returns {User | null} Thông tin người dùng nếu đã đăng nhập, null nếu chưa đăng nhập
   */
  getCurrentUser: (): User | null => {
    return auth.currentUser;
  },

  /**
   * Gửi email reset mật khẩu
   * @param {string} email - Email cần reset mật khẩu
   * @returns {Promise<void>}
   * @throws {Error} Lỗi khi gửi email reset
   */
  resetPassword: async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  /**
   * Cập nhật thông tin profile người dùng
   * @param {string} displayName - Tên hiển thị mới
   * @param {string} photoURL - URL ảnh đại diện mới
   * @returns {Promise<void>}
   * @throws {Error} Lỗi khi cập nhật profile
   */
  updateProfile: async (displayName?: string, photoURL?: string): Promise<void> => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Không tìm thấy người dùng');

      await updateProfile(user, {
        displayName: displayName || user.displayName,
        photoURL: photoURL || user.photoURL
      });

      // Cập nhật thông tin trong Firestore
      await setDoc(doc(db, 'users', user.uid), {
        displayName: displayName || user.displayName,
        photoURL: photoURL || user.photoURL,
        updatedAt: new Date()
      }, { merge: true });

    } catch (error: any) {
      throw new Error(error.message);
    }
  }
};

/**
 * Các mã lỗi authentication phổ biến
 * @enum {string}
 */
export const AUTH_ERROR_CODES = {
  /** Email không hợp lệ */
  INVALID_EMAIL: 'auth/invalid-email',
  /** Tài khoản bị vô hiệu hóa */
  USER_DISABLED: 'auth/user-disabled',
  /** Không tìm thấy tài khoản */
  USER_NOT_FOUND: 'auth/user-not-found',
  /** Sai mật khẩu */
  WRONG_PASSWORD: 'auth/wrong-password',
  /** Email đã được sử dụng */
  EMAIL_IN_USE: 'auth/email-already-in-use'
};