import { useTheme } from "@/providers/ThemeProvider";
import { authApi } from "@/shared/api/auth";
import { LoginCredentials, User } from "@/shared/types";
import { useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { applyTheme, resetTheme } = useTheme();

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const response = await authApi.login(credentials);
      if (response.success && response.result) {
        setUser(response.result);

        // Apply user theme if available
        if (response.result.uiSettings?.theme) {
          applyTheme(response.result.uiSettings.theme);
        }
      }
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authApi.logout();
      setUser(null);
      resetTheme();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    login,
    logout,
    loading,
  };
};
