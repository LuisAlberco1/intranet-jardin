import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import type { CSSProperties } from "react";

export default function Dashboard() {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const [totalComunicados, setTotalComunicados] = useState(0);
  const [totalReuniones, setTotalReuniones] = useState(0);
  const [totalActividades, setTotalActividades] = useState(0);

  if (!ctx) return null;

  const { user, logout } = ctx;

  useEffect(() => {
    const comunicados =
      JSON.parse(
        localStorage.getItem("comunicados") || "[]"
      );

    const reuniones =
      JSON.parse(
        localStorage.getItem("reuniones") || "[]"
      );

    const actividades =
      JSON.parse(
        localStorage.getItem("actividades") || "[]"
      );

    setTotalComunicados(comunicados.length);
    setTotalReuniones(reuniones.length);
    setTotalActividades(actividades.length);
  }, []);

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

      <h2>Resumen del sistema</h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <div style={cardStyle}>
          <h3>{totalComunicados}</h3>
          <p>Comunicados</p>
        </div>

        <div style={cardStyle}>
          <h3>{totalReuniones}</h3>
          <p>Reuniones</p>
        </div>

        <div style={cardStyle}>
          <h3>{totalActividades}</h3>
          <p>Actividades</p>
        </div>
      </div>

      <h2>Módulos</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "15px",
        }}
      >
        <Link to="/comunicados">
          <div style={cardStyle}>
            📢
            <h3>Comunicados</h3>
          </div>
        </Link>

        <Link to="/reuniones">
          <div style={cardStyle}>
            👨‍👩‍👧
            <h3>Reuniones</h3>
          </div>
        </Link>

        <Link to="/actividades">
          <div style={cardStyle}>
            📅
            <h3>Actividades</h3>
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
  textAlign: "center",
};