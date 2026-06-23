import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  if (!ctx) {
    return null;
  }

  const { user, logout } = ctx;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div>
        <b>🏫 Intranet Jardín</b>
      </div>

      <div className="nav-links">
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
        <span>
          {user?.nombre}
          {" - "}
          {user?.rol}
        </span>

        <button onClick={handleLogout}>
          Salir
        </button>
      </div>
    </div>
  );
}