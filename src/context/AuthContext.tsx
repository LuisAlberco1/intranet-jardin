import { createContext, useState, useEffect, type ReactNode } from "react";

type User = {
  nombre: string;
  rol: string;
};

type AuthContextType = {
  user: User | null;
  login: (data: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("session");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (data: User) => {
    setUser(data);
    localStorage.setItem("session", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("session");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}