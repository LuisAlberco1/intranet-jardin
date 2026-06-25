// Contexto de autenticación para manejar la sesión del usuario y persistirla en localStorage.
import { createContext, useState, type ReactNode } from "react";
// Tipo de usuario que se almacena en el contexto de autenticación.
type User = {
  user: string;
};

// Contexto de autenticación que maneja la sesión del usuario
// y guarda los datos en localStorage para persistencia.
type AuthContextType = { 
  user: User | null; // Usuario actualmente autenticado o null si no hay sesión activa.
  login: (data: User) => void; // Función para iniciar sesión y establecer el usuario en el contexto.
  logout: () => void; // Función para cerrar sesión y limpiar el usuario del contexto y localStorage.
};

// Creación del contexto de autenticación con un valor inicial nulo.
export const AuthContext = createContext<AuthContextType | null>(null); 

// Proveedor de autenticación que envuelve la aplicación y proporciona
// el contexto de autenticación a todos los componentes hijos.
export function AuthProvider({ children }: { children: ReactNode }) { // Componente proveedor que maneja la sesión del usuario y la persistencia en localStorage.
  const [user, setUser] = useState<User | null>(() => { // Inicializa el estado del usuario desde localStorage si existe.
    const stored = localStorage.getItem("session"); // Recupera la sesión almacenada en localStorage.
    return stored ? JSON.parse(stored) : null; // Si hay datos, los parsea; si no, retorna null.
  });

  // Inicia sesión y almacena la sesión en localStorage.
  const login = (data: User) => { // Función para iniciar sesión y establecer el usuario en el contexto.
    setUser(data); // Actualiza el estado del usuario en memoria.
    localStorage.setItem("session", JSON.stringify(data)); // Guarda la sesión en localStorage para persistencia.
  };

  // Cierra sesión y elimina la información almacenada.
  const logout = () => { // Función para cerrar sesión y limpiar el usuario del contexto y localStorage.
    setUser(null); // Limpia el estado del usuario en memoria.
    localStorage.removeItem("session"); // Elimina la sesión almacenada en localStorage para que no persista.
  };

// Renderiza el proveedor de autenticación con el valor del contexto.
// El valor del contexto incluye el usuario actual y las funciones de login y logout.
// El proveedor envuelve a los componentes hijos para que puedan acceder al contexto de autenticación.
  return (
    <AuthContext.Provider value={{ user, login, logout }}> 
      {children} 
    </AuthContext.Provider> 
  );
}