import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";

function App() {
  const ctx = useContext(AuthContext);

  if (!ctx) return null;

  const { user } = ctx;

  return (
    <Routes>
      {/* Ruta login */}
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />

      {/* Dashboard protegido */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;