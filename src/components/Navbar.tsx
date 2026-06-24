import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  // Obtenemos el contexto de autenticación para mostrar el usuario y cerrar sesión.
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  // Si el contexto todavía no está listo, no renderizamos la barra.
  if (!ctx) {
    return null;
  }

  const { user, logout } = ctx;

  // Cierra la sesión y redirige al login.
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar-brand">
        <img src="/logo.png" alt="Logo Jardín" className="navbar-logo" />
        <b>Intranet Jardín</b>
      </div>

      <div className="nav-links">
        {/* Navegación principal entre las secciones de la intranet. */}
        <Link to="/dashboard">
          Inicio
        </Link>

        <Link to="/comunicados">
          Comunicados
        </Link>

        <Link to="/reuniones">
          Reuniones
        </Link>

        <Link to="/actividades">
          Actividades
        </Link>
      </div>

      <div className="nav-user">
        {/* Usuario autenticado y acción de cerrar sesión. */}
        <span>
          {user?.user}
        </span>

        <button onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}