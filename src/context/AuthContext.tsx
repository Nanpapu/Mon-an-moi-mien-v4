// Context quản lý trạng thái đăng nhập và xác thực người dùng
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from 'firebase/auth';
import { AuthService } from '../services/authService';
import { auth } from '../config/firebase';
import { sendPasswordResetEmail } from "firebase/auth";

// Định nghĩa các hàm và state có trong context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

// Tạo context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // STATE
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lắng nghe sự thay đổi trạng thái đăng nhập
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  // HANDLERS
  // Xử lý đăng nhập
  const login = async (email: string, password: string) => {
    try {
      const user = await AuthService.login(email, password);
      setUser(user);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // Xử lý đăng ký
  const register = async (email: string, password: string) => {
    try {
      const user = await AuthService.register(email, password);
      setUser(user);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // Xử lý đăng xuất
  const logout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // Xử lý đặt lại mật khẩu
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  };

  // RENDER
  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, resetPassword }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

// Thêm export cho hook useAuth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};