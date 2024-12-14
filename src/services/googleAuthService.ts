import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../config/firebase';

export const GoogleAuthService = {
  // Config Google Sign In
  useGoogleAuth: () => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        // clientId: 'YOUR_GOOGLE_CLIENT_ID',
        // iosClientId: 'YOUR_IOS_CLIENT_ID',
      androidClientId: "968081313298-aa36cfggjg48bm2p0pbj5ak00e3iaq5b.apps.googleusercontent.com",
      // Thêm các clientId khác nếu cần (iOS, web)
    });

    return {
      request,
      response,
      promptAsync
    };
  },

  // Xử lý đăng nhập với Google
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