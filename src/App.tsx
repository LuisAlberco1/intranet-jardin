import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Comunicados from "./pages/Comunicados";
import Reuniones from "./pages/Reuniones";
import Actividades from "./pages/Actividades";
import DetalleComunicado from "./pages/DetalleComunicado";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const session = localStorage.getItem("session");

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/"
        element={
          session
            ? <Navigate to="/dashboard" />
            : <Login />
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

      {/* Detalle comunicado (useParams) */}
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
    </Routes>
  );
}

export default App;