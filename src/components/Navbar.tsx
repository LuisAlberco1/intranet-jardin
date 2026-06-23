import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const ctx = useContext(AuthContext);

  if (!ctx) return null;

  const { user, logout } = ctx;

  return (
    <div className="navbar">
      <div>
        <b>🏫 Intranet Jardín</b>
      </div>

      <div className="nav-links">
        <Link to="/dashboard">Inicio</Link>
        <Link to="/comunicados">Comunicados</Link>
        <Link to="/reuniones">Reuniones</Link>
        <Link to="/actividades">Actividades</Link>
      </div>

      <div className="nav-user">
        <span>{user?.nombre}</span>

        <button onClick={logout}>
          Salir
        </button>
      </div>
    </div>
  );
}