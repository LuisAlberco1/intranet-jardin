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

function App() {
  const ctx = useContext(AuthContext);

  const user = ctx?.user;

  return (
    <>
      {/* Navbar global */}
      {user && <Navbar />}

      <Routes>
        {/* Login */}
        <Route
          path="/"
          element={
            user ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Comunicados */}
        <Route
          path="/comunicados"
          element={
            <ProtectedRoute>
              <Comunicados />
            </ProtectedRoute>
          }
        />

        {/* Detalle */}
        <Route
          path="/comunicado/:id"
          element={
            <ProtectedRoute>
              <DetalleComunicado />
            </ProtectedRoute>
          }
        />

        {/* Reuniones */}
        <Route
          path="/reuniones"
          element={
            <ProtectedRoute>
              <Reuniones />
            </ProtectedRoute>
          }
        />

        {/* Actividades */}
        <Route
          path="/actividades"
          element={
            <ProtectedRoute>
              <Actividades />
            </ProtectedRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;