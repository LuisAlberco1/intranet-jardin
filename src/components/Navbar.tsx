import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const ctx = useContext(AuthContext);

  if (!ctx) return null;

  const { user, logout } = ctx;

  return (
    <div style={styles.navbar}>
      <div>
        <b>Intranet Jardín</b>
      </div>

      <div style={styles.links}>
        <Link to="/dashboard">Inicio</Link>
        <Link to="/comunicados">Comunicados</Link>
        <Link to="/reuniones">Reuniones</Link>
        <Link to="/actividades">Actividades</Link>
      </div>

      <div style={styles.user}>
        <span>{user?.nombre}</span>

        <button onClick={logout}>
          Salir
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    borderBottom: "1px solid #ccc",
    alignItems: "center",
  },
  links: {
    display: "flex",
    gap: "15px",
  },
  user: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
};