"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
  avatar: string | null;
  address: string;
  phoneNumber: string;
  gender: string;
  date: string;
  status: string;
  googleId: string | null;
  createdAt: string;
  updateAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (accessToken: string, userData: User) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Check if token is expired
  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  // Check authentication status
  const checkAuth = (): boolean => {
    const accessToken = Cookies.get("accessToken");
    const userData = Cookies.get("user");

    if (!accessToken || !userData) {
      return false;
    }

    if (isTokenExpired(accessToken)) {
      logout();
      return false;
    }

    return true;
  };

  // Login function
  const login = (accessToken: string, userData: User) => {
    Cookies.set("accessToken", accessToken, { expires: 7 });
    Cookies.set("user", JSON.stringify(userData), { expires: 7 });
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("user");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  // Initialize auth state from cookies
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const userData = Cookies.get("user");

    if (accessToken && userData) {
      if (isTokenExpired(accessToken)) {
        logout();
      } else {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error parsing user data:", error);
          logout();
        }
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
