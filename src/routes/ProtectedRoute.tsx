import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }: any) {
  const ctx = useContext(AuthContext);

  const user = ctx?.user;

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}