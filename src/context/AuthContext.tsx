import React, { createContext, useContext, useState, useEffect } from "react";
import AuthService, { type User } from "../api/AuthService";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  refetchUser: () => Promise<void>;
  handleLogout: () => Promise<boolean>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const { user } = await AuthService.checkAuth();
      setUser(user);
    } catch (error) {
      setUser(null);
      console.warn("No valid session", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();

    const handleUnauthorized = () => {
      console.log("🔄 AuthContext: Received 401, clearing user");
      setUser(null);
      setLoading(false);
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, []);
  const handleLogout = async () => {
    try {
      const response = await AuthService.logOut();
      if (response.success) {
        setUser(null)
        return response.success
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  const value: AuthContextType = {
    user,
    loading,
    handleLogout,
    refetchUser: fetchUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}