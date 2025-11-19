// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import axiosInterceptor from "../api/axios";

// 👇 Configure axios to send credentials (cookies) with every request

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  refetchUser: () => Promise<void>; // Optionally expose refetch
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Replace with your actual auth API endpoint

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user session (relies on cookie being sent automatically)
  const fetchUser = async () => {
    try {
      const response = await axiosInterceptor.get(`/auth/check`);
      setUser(response?.data?.user); // assuming { user: { id, email, ... } }
    } catch (error) {
      // Unauthorized or invalid session → clear user
      setUser(null);
      console.warn("No valid session:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(); // Initial load
  }, []);

  const value: AuthContextType = {  
    user,
    loading,
    refetchUser: fetchUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}