import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }: any) {
  const ctx = useContext(AuthContext);

  if (!ctx) return null;

  const { user } = ctx;

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}