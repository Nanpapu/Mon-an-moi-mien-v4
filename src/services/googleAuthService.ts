import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../config/firebase';

export const GoogleAuthService = {
  // Config Google Sign In
  useGoogleAuth: () => {
    return Google.useIdTokenAuthRequest({
      androidClientId: "977479607170-vapfgpk2si1nfk0t9o6lr57a1c84nk35.apps.googleusercontent.com",
      webClientId: "977479607170-4tr2n8qvv757q3lchd96mic5nq805gfa.apps.googleusercontent.com",
      redirectUri: "monanmoimien://oauth2redirect/google"
    });
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