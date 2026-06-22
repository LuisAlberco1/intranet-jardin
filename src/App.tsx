import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Comunicados from "./pages/Comunicados";
import Reuniones from "./pages/Reuniones";
import Actividades from "./pages/Actividades";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const session = localStorage.getItem("session");

  return (
    <Routes>
      <Route
        path="/"
        element={session ? <Navigate to="/dashboard" /> : <Login />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/comunicados"
        element={
          <ProtectedRoute>
            <Comunicados />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reuniones"
        element={
          <ProtectedRoute>
            <Reuniones />
          </ProtectedRoute>
        }
      />

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