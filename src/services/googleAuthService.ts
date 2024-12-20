/**
 * @fileoverview Service xử lý đăng nhập bằng Google
 */

import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../config/firebase';

/**
 * Service quản lý xác thực qua Google
 * @module GoogleAuthService
 */
export const GoogleAuthService = {
  /**
   * Hook cấu hình Google Sign In
   * @returns {Google.UseIdTokenAuthRequestResult} Hook để xử lý Google Auth
   */
  useGoogleAuth: () => {
    return Google.useIdTokenAuthRequest({
      androidClientId: "977479607170-vapfgpk2si1nfk0t9o6lr57a1c84nk35.apps.googleusercontent.com",
      webClientId: "977479607170-4tr2n8qvv757q3lchd96mic5nq805gfa.apps.googleusercontent.com",
      redirectUri: "monanmoimien://oauth2redirect/google"
    });
  },

  /**
   * Xử lý đăng nhập với Google
   * @param {string} idToken - Token xác thực từ Google
   * @returns {Promise<User>} Thông tin người dùng sau khi đăng nhập
   * @throws {Error} Lỗi khi đăng nhập thất bại
   */
  signInWithGoogle: async (idToken: string) => {
    try {
      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, credential);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }
}; 