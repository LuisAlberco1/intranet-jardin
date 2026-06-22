import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import type { CSSProperties } from "react";

export default function Dashboard() {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  if (!ctx) return null;

  const { user, logout } = ctx;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🏫 Intranet Jardín Infantil</h1>

      <p>
        Usuario: <b>{user?.nombre}</b> | Rol: {user?.rol}
      </p>

      <hr />

      <h2>Panel de Administración</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <Link to="/comunicados">
          <div style={cardStyle}>
            📢 <h3>Comunicados</h3>
            <p>Gestión de avisos</p>
          </div>
        </Link>

        <Link to="/reuniones">
          <div style={cardStyle}>
            👨‍👩‍👧 <h3>Reuniones</h3>
            <p>Apoderados</p>
          </div>
        </Link>

        <Link to="/actividades">
          <div style={cardStyle}>
            📅 <h3>Actividades</h3>
            <p>Calendario</p>
          </div>
        </Link>
      </div>

      <hr />

      <button onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
}

const cardStyle: CSSProperties = {
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  cursor: "pointer",
  textAlign: "center",
};