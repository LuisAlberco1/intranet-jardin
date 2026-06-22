import { Link } from "react-router-dom";

export default function Dashboard() {
  const logout = () => {
    localStorage.removeItem("session");
    window.location.reload();
  };

  return (
    <div>
      <h1>Panel Administración Jardín Infantil</h1>

      <p>Bienvenido al sistema</p>

      <hr />

      <h2>Módulos</h2>

      <div>
        <Link to="/comunicados">
          <button>Gestión Comunicados</button>
        </Link>

        <Link to="/reuniones">
          <button>Reuniones Apoderados</button>
        </Link>

        <Link to="/actividades">
          <button>Calendario Actividades</button>
        </Link>
      </div>

      <hr />

      <button onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
}