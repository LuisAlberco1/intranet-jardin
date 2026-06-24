import { createContext, useState, type ReactNode } from "react";

type User = {
  user: string;
};

// Contexto de autenticación que maneja la sesión del usuario
// y guarda los datos en localStorage para persistencia.
type AuthContextType = {
  user: User | null;
  login: (data: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("session");
    return stored ? JSON.parse(stored) : null;
  });

  // Inicia sesión y almacena la sesión en localStorage.
  const login = (data: User) => {
    setUser(data);
    localStorage.setItem("session", JSON.stringify(data));
  };

  // Cierra sesión y elimina la información almacenada.
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