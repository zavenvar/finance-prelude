import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authApi, setAuthToken, clearAuthToken } from "@/lib/api";

interface AdminUser {
  id: number;
  username: string;
  name: string;
  role: string;
}

interface AdminContextType {
  isAdmin: boolean;
  user: AdminUser | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if there's a valid token on mount
    const verifyToken = async () => {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await authApi.verify();
        if (response.valid && response.user) {
          setIsAdmin(true);
          setUser(response.user);
        }
      } catch {
        // Token invalid, clear it
        clearAuthToken();
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await authApi.login(username, password);
      if (response.success && response.token) {
        setAuthToken(response.token);
        setIsAdmin(true);
        setUser(response.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    authApi.logout();
    setIsAdmin(false);
    setUser(null);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, user, isLoading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};
