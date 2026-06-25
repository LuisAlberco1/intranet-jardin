import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Comunicados from "./pages/Comunicados";
import Reuniones from "./pages/Reuniones";
import Actividades from "./pages/Actividades";
import DetalleComunicado from "./pages/DetalleComunicado";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";

import "./styles/navbar.css";
import "./styles/dashboard.css";
import "./styles/pages.css";

// Componente principal que define la estructura de rutas y controla
// si el usuario debe ir al login o al dashboard.
function App() {
  // Acceso al contexto de autenticación para determinar si hay un usuario logueado.
  const ctx = useContext(AuthContext);
  // Extrae el usuario actual (si existe).
  const user = ctx?.user; 

  return (
    <>
      {/* Navbar global que solo se muestra cuando hay usuario autenticado. */}
      {user && <Navbar />}

      <Routes>
        {/* Login: página pública para iniciar sesión. */}
        <Route
          path="/"
          element={
            user ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />

        {/* Dashboard: vista principal del usuario autenticado. */}
        <Route //Ruta protegida que solo permite acceso si hay usuario logueado.
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Comunicados: módulo para crear, editar y buscar comunicados. */}
        <Route //Ruta protegida que solo permite acceso si hay usuario logueado.
          path="/comunicados"
          element={
            <ProtectedRoute>
              <Comunicados />
            </ProtectedRoute>
          }
        />

        {/* Detalle del comunicado seleccionado. */}
        <Route //Ruta protegida que solo permite acceso si hay usuario logueado.
          path="/comunicado/:id"
          element={
            <ProtectedRoute>
              <DetalleComunicado />
            </ProtectedRoute>
          }
        />

        {/* Reuniones: módulo para administrar reuniones y validar fechas futuras. */}
        <Route //Ruta protegida que solo permite acceso si hay usuario logueado.
          path="/reuniones"
          element={
            <ProtectedRoute>
              <Reuniones />
            </ProtectedRoute>
          }
        />

        {/* Actividades: módulo para planificar actividades del jardín. */}
        <Route //Ruta protegida que solo permite acceso si hay usuario logueado.
          path="/actividades"
          element={
            <ProtectedRoute>
              <Actividades />
            </ProtectedRoute>
          }
        />

        {/* Ruta fallback que redirige al login cuando la URL no coincide. */}
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;