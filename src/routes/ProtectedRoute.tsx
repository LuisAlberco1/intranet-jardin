import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    return null;
  }

  const { user } = ctx;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}