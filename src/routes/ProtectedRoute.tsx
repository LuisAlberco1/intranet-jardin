import { Navigate } from "react-router-dom";
import { useContext } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    return <Navigate to="/" replace />;
  }

  const { user, loading } = ctx;

  // mientras Firebase verifica sesión
  if (loading) {
    return <p style={{ padding: 20 }}>Cargando...</p>;
  }

  // si no hay usuario autenticado
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}