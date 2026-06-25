import { Navigate } from "react-router-dom";
import { useContext } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";

// Componente de ruta protegida que verifica si el usuario está autenticado.
type Props = {
  children: ReactNode;
};

// Ruta protegida que redirige al login si no hay usuario autenticado.
export default function ProtectedRoute({
  children,
}: Props) { 
  const ctx = useContext(AuthContext); 

  if (!ctx) {
    return <Navigate to="/" replace />;
  }

  const { user } = ctx;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}