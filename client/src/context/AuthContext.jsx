import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { changePassword, getMe, loginAdmin } from "../api/services";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("portfolio_token");
    if (!token) {
      setLoading(false);
      return;
    }
    getMe()
      .then((res) => setUser(res.user))
      .catch(() => {
        localStorage.removeItem("portfolio_token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login: async (email, password) => {
        const res = await loginAdmin({ email, password });
        localStorage.setItem("portfolio_token", res.token);
        setUser(res.user);
        return res;
      },
      logout: () => {
        localStorage.removeItem("portfolio_token");
        setUser(null);
      },
      updatePassword: changePassword,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
