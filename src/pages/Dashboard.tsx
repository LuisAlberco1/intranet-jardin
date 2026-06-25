import { useContext, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";

// Página principal del dashboard. Muestra un resumen de comunicados, reuniones y actividades, así como accesos rápidos a los módulos de gestión.
export default function Dashboard() {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);

  // Si alguno de los contextos no está disponible, no renderiza nada.
  if (!authCtx || !dataCtx) {
    return null;
  }

  // Extrae el usuario autenticado del contexto de autenticación.
  const { user } = authCtx;

  // Si no hay usuario autenticado, no renderiza nada.
  if (!user) {
    return null;
  }

  // Extrae los datos de comunicados, reuniones y actividades del contexto de datos.
  const {
    comunicados,
    reuniones,
    actividades,
  } = dataCtx;

  // Parámetros para controlar el rango de días en los que se muestran próximos eventos.
  const [diasReuniones, setDiasReuniones] = useState<number>(7);
  const [diasActividades, setDiasActividades] = useState<number>(14);

  // Fecha base utilizada para calcular eventos próximos.
  const ahora = useMemo(() => new Date(), []);

  // Filtra las reuniones que ocurren dentro del rango seleccionado.
  const proximasReuniones = reuniones.filter((r) => { 
    try {
      const fechaStr = r.fecha ?? ""; // Fecha de la reunión en formato YYYY-MM-DD
      const horaStr = r.hora ? `T${r.hora}` : ""; // Hora de la reunión en formato HH:MM, si existe
      const dt = new Date(fechaStr + horaStr); // Combina fecha y hora para crear un objeto Date
      const max = new Date(ahora.getTime() + diasReuniones * 24 * 60 * 60 * 1000); // Calcula la fecha máxima permitida según el rango de días
      return dt >= ahora && dt <= max; // Devuelve true si la reunión está dentro del rango de fechas
    } catch { // Si ocurre un error al parsear la fecha, se considera que la reunión no es válida para el rango.
      return false; // Manejo de errores: si la fecha no es válida, se excluye la reunión de la lista de próximas reuniones.
    }
  });

  // Filtra las actividades que ocurren dentro del rango seleccionado.
  const proximasActividades = actividades.filter((a) => {
    try {
      const dt = new Date(a.fecha); // Convierte la fecha de la actividad a un objeto Date
      const max = new Date(ahora.getTime() + diasActividades * 24 * 60 * 60 * 1000); // Calcula la fecha máxima permitida según el rango de días
      return dt >= ahora && dt <= max; // Devuelve true si la actividad está dentro del rango de fechas
    } catch { 
      return false; 
    }
  });

  // Renderiza la página del dashboard con resumen de datos y accesos rápidos a los módulos.
  return (
    <div className="dashboard-page">
      {/* Cabecera de bienvenida con el usuario autenticado */}
      <div className="dashboard-header">
        <h1>🏫 Bienvenido a la Intranet</h1>
        <p>Usuario: <strong>{user.user}</strong></p>
      </div>

      <div className="dashboard-container">
        {/* Resumen de las cantidades totales de comunicaciones, reuniones y actividades */}
        <div className="summary-section">
          <h2>📊 Resumen del Sistema</h2>
          <div className="cards-grid">
            <div className="summary-card">
              <h3>{comunicados.length}</h3>
              <p>📢 Comunicados</p>
            </div>

            <div className="summary-card">
              <h3>{reuniones.length}</h3>
              <p>👨‍👩‍👧 Reuniones</p>
            </div>

            <div className="summary-card">
              <h3>{actividades.length}</h3>
              <p>📅 Actividades</p>
            </div>
          </div>
        </div>

        {/* Accesos rápidos a los módulos de gestión del intranet */}
        <div className="summary-section">
          <h2>🎯 Módulos de Gestión</h2>
          <div className="modules-grid">
            <Link to="/comunicados" style={{ textDecoration: 'none' }}>
              <div className="module-card">
                <div className="module-card-header">
                  <h3>📢 Comunicados</h3>
                  <p>Administrar comunicados internos</p>
                </div>
                <div className="module-card-footer">
                  Haz clic para entrar →
                </div>
              </div>
            </Link>

            <Link to="/reuniones" style={{ textDecoration: 'none' }}>
              <div className="module-card">
                <div className="module-card-header">
                  <h3>👨‍👩‍👧 Reuniones</h3>
                  <p>Gestionar reuniones de apoderados</p>
                </div>
                <div className="module-card-footer">
                  Haz clic para entrar →
                </div>
              </div>
            </Link>

            <Link to="/actividades" style={{ textDecoration: 'none' }}>
              <div className="module-card">
                <div className="module-card-header">
                  <h3>📅 Actividades</h3>
                  <p>Calendario de actividades</p>
                </div>
                <div className="module-card-footer">
                  Haz clic para entrar →
                </div>
              </div>
            </Link>
          </div>
        </div>

        {}
        <div className="summary-section upcoming-cards" style={{ marginTop: 20 }}>
          <h2>⏰ Próximas Reuniones y Actividades</h2>
          <div className="cards-row">
            <div className="card card-reuniones">
              <div className="card-header">
                <div>
                  <h3>👨‍👩‍👧 Reuniones</h3>
                  <div className="card-sub">Próximas en {diasReuniones} días</div>
                </div>
                <div className="card-controls card-controls-column">
                  <label htmlFor="diasReuniones" className="card-input-label">Plazo</label>
                  <input
                    id="diasReuniones"
                    className="card-input"
                    type="number"
                    min={1}
                    value={diasReuniones}
                    onChange={(e) => setDiasReuniones(Number(e.target.value) || 1)}
                  />
                </div>
              </div>

              <div className="card-body">
                {proximasReuniones.length === 0 ? (
                  <div className="card-empty">No hay reuniones próximamente.</div>
                ) : (
                  proximasReuniones.map((r) => (
                    <div key={r.id} className="card-item">
                      <div className="card-item-title">{r.titulo}</div>
                      <div className="card-item-meta">{new Date(`${r.fecha}T${r.hora || '00:00'}`).toLocaleString()}</div>
                      <div className="card-item-desc">{r.descripcion}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="card card-actividades">
              <div className="card-header">
                <div>
                  <h3>📅 Actividades</h3>
                  <div className="card-sub">Próximas en {diasActividades} días</div>
                </div>
                <div className="card-controls card-controls-column">
                  <label htmlFor="diasActividades" className="card-input-label">Plazo</label>
                  <input
                    id="diasActividades"
                    className="card-input"
                    type="number"
                    min={1}
                    value={diasActividades}
                    onChange={(e) => setDiasActividades(Number(e.target.value) || 1)}
                  />
                </div>
              </div>

              <div className="card-body">
                {proximasActividades.length === 0 ? (
                  <div className="card-empty">No hay actividades próximamente.</div>
                ) : (
                  proximasActividades.map((a) => (
                    <div key={a.id} className="card-item">
                      <div className="card-item-title">{a.nombre}</div>
                      <div className="card-item-meta">{new Date(a.fecha).toLocaleString()}</div>
                      <div className="card-item-desc">{a.descripcion}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
