import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";

export default function Dashboard() {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);

  const navigate = useNavigate();

  if (!authCtx || !dataCtx) {
    return null;
  }

  const { user, logout } = authCtx;

  // seguridad TS
  if (!user) {
    return null;
  }

  const {
    comunicados,
    reuniones,
    actividades,
  } = dataCtx;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container">
      <h1>🏫 Intranet Jardín Infantil</h1>

      <p>
        Usuario: <b>{user.nombre}</b>
        {" | "}
        Rol: <b>{user.rol}</b>
      </p>

      <hr />

      <h2>Resumen del sistema</h2>

      <div className="grid grid-3">

        <div className="card">
          <h3>{comunicados.length}</h3>
          <p>📢 Comunicados</p>
        </div>

        <div className="card">
          <h3>{reuniones.length}</h3>
          <p>👨‍👩‍👧 Reuniones</p>
        </div>

        <div className="card">
          <h3>{actividades.length}</h3>
          <p>📅 Actividades</p>
        </div>

      </div>

      <hr />

      <h2>Módulos</h2>

      <div className="grid grid-3">

        <Link to="/comunicados">
          <div className="card">
            <h3>📢 Comunicados</h3>
            <p>Administrar comunicados internos</p>
          </div>
        </Link>

        <Link to="/reuniones">
          <div className="card">
            <h3>👨‍👩‍👧 Reuniones</h3>
            <p>Gestionar reuniones</p>
          </div>
        </Link>

        <Link to="/actividades">
          <div className="card">
            <h3>📅 Actividades</h3>
            <p>Gestionar actividades</p>
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