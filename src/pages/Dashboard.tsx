import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const getLength = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    if (!data) return 0;

    const parsed = JSON.parse(data);

    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
};

export default function Dashboard() {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const [totalComunicados, setTotalComunicados] = useState(0);
  const [totalReuniones, setTotalReuniones] = useState(0);
  const [totalActividades, setTotalActividades] = useState(0);

  if (!ctx) return null;

  const { user, logout } = ctx;

  const actualizar = () => {
    setTotalComunicados(getLength("comunicados"));
    setTotalReuniones(getLength("reuniones"));
    setTotalActividades(getLength("actividades"));
  };

  // carga inicial
  useEffect(() => {
    actualizar();
  }, []);

  // 🔥 sincronización cada vez que vuelves a la pestaña
  useEffect(() => {
    window.addEventListener("focus", actualizar);

    return () => {
      window.removeEventListener("focus", actualizar);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container">
      <h1>🏫 Intranet Jardín Infantil</h1>

      <p>
        Usuario: <b>{user?.nombre}</b> | Rol: {user?.rol}
      </p>

      <hr />

      <h2>Resumen del sistema</h2>

      <div className="grid grid-3">
        <div className="card">
          <h3>{totalComunicados}</h3>
          <p>Comunicados</p>
        </div>

        <div className="card">
          <h3>{totalReuniones}</h3>
          <p>Reuniones</p>
        </div>

        <div className="card">
          <h3>{totalActividades}</h3>
          <p>Actividades</p>
        </div>
      </div>

      <hr />

      <h2>Módulos</h2>

      <div className="grid grid-3">
        <Link to="/comunicados">
          <div className="card">
            <h3>📢 Comunicados</h3>
          </div>
        </Link>

        <Link to="/reuniones">
          <div className="card">
            <h3>👨‍👩‍👧 Reuniones</h3>
          </div>
        </Link>

        <Link to="/actividades">
          <div className="card">
            <h3>📅 Actividades</h3>
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