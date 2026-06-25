import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import type { Actividad } from "../types/Actividad";

// Página de actividades que permite crear, editar, eliminar y buscar actividades programadas.
export default function Actividades() {
  const ctx = useContext(DataContext);

  // Si el contexto no está disponible, no renderiza nada.
  if (!ctx) return null;

  // Extrae las actividades y la función para actualizar la lista desde el contexto.
  const { actividades, setActividades } = ctx;

  // Estados locales para manejar los campos del formulario y la búsqueda.
  const [nombre, setNombre] = useState(""); 
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [responsable, setResponsable] = useState("");
  const [error, setError] = useState("");

  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const hoy = new Date().toISOString().split("T")[0]; 
  // Fecha mínima para evitar actividades en el pasado.

  // Fecha mínima para evitar actividades con fecha pasada.

  // Limpia los campos del formulario y el error.
  const limpiar = () => {
    setNombre("");
    setFecha("");
    setDescripcion("");
    setResponsable("");
    setError("");
  };

  // Agrega una nueva actividad validando fecha futura y campos.
  // Agrega una nueva actividad validando los campos y la fecha.
  const agregar = () => {
    if (!nombre || !fecha || !descripcion || !responsable) {
      setError("Por favor completa todos los campos.");
      return;
    }

    // Valida que la fecha de la actividad sea futura.
    const fechaActividad = new Date(fecha);
    if (fechaActividad < new Date()) {
      setError("La actividad debe programarse en una fecha futura.");
      return;
    }

    // Crea un nuevo objeto de actividad con un ID único y los datos del formulario.
    const nueva: Actividad = {
      id: crypto.randomUUID(),
      nombre,
      fecha,
      descripcion,
      responsable,
    };

    // Agrega la nueva actividad a la lista en el contexto y limpia el formulario.
    setActividades((prev) => [...prev, nueva]);
    limpiar();
  };

  // Elimina una actividad por su ID.
  const eliminar = (id: string) => {
    setActividades((prev) => prev.filter((a) => a.id !== id));
  };

  // Carga los datos de una actividad en el formulario para editarla.
  const iniciarEdicion = (a: Actividad) => {
    setEditandoId(a.id);
    setNombre(a.nombre);
    setFecha(a.fecha);
    setDescripcion(a.descripcion);
    setResponsable(a.responsable);
  };

  // Guarda los cambios de una actividad existente.
  // Guarda los cambios de una actividad editada.
  const guardar = () => {
    if (!editandoId) return;

    // Valida que todos los campos estén completos y que la fecha sea futura.
    if (!nombre || !fecha || !descripcion || !responsable) {
      setError("Por favor completa todos los campos.");
      return;
    }

    // Valida que la fecha de la actividad sea futura.
    const fechaActividad = new Date(fecha);
    if (fechaActividad < new Date()) {
      setError("La actividad debe programarse en una fecha futura.");
      return;
    }

    // Actualiza la actividad en la lista del contexto reemplazando la actividad editada.
    setActividades((prev) =>
      prev.map((a) =>
        a.id === editandoId
          ? { ...a, nombre, fecha, descripcion, responsable }
          : a
      )
    );
// Limpia el formulario y sale del modo edición.
    setEditandoId(null);
    limpiar();
  };

  // Filtra las actividades por nombre o responsable.
  const listaFiltrada = actividades.filter((a) => {
    const q = busqueda.toLowerCase(); // Convierte la búsqueda a minúsculas para comparación insensible a mayúsculas.
    return (
      a.nombre.toLowerCase().includes(q) || // Filtra por nombre o responsable
      a.responsable.toLowerCase().includes(q) 
    );
  });

  // Renderiza la página de actividades con el formulario y la lista de actividades.
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📅 Calendario de Actividades</h1>
        <p>Planifica y gestiona todas las actividades del jardín</p>
      </div>

      <div className="page-content">
        {/* FORM */}
        <div className="form-section">
          <h2>{editandoId ? "Editar" : "Nueva"} Actividad</h2>

          <div className="form-group">
            <label>Nombre de la Actividad</label>
            <input
              type="text"
              placeholder="Ej: Salida al parque"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Fecha</label>
            <input
              type="date"
              min={hoy}
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              placeholder="Detalles de la actividad..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="form-group">
            <label>Responsable</label>
            <input
              type="text"
              placeholder="Nombre del responsable"
              value={responsable}
              onChange={(e) => setResponsable(e.target.value)}
            />
          </div>

          <div className="form-buttons">
            {editandoId ? (
              <>
                <button className="btn-primary" onClick={guardar}>
                  Guardar cambios
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setEditandoId(null);
                    limpiar();
                  }}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button className="btn-primary" onClick={agregar}>
                Crear actividad
              </button>
            )}
          </div>
        </div>

        {/* LIST */}
        <div className="list-section">
          <div className="list-header">
            <h2>Actividades Programadas</h2>
            <input
              type="text"
              className="search-box"
              placeholder="🔍 Buscar actividad..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          {listaFiltrada.length === 0 ? (
            <div className="empty-state">
              <p>📭 No hay actividades programadas</p>
            </div>
          ) : (
            <div className="list-items">
              {listaFiltrada.map((a) => (
                <div key={a.id} className="list-item">
                  <div className="list-item-header">
                    <h3 className="list-item-title">{a.nombre}</h3>
                  </div>

                  <div className="list-item-meta">
                    <span>📅 {new Date(a.fecha).toLocaleDateString()}</span>
                    <span>👤 {a.responsable}</span>
                  </div>

                  <p className="list-item-content">{a.descripcion}</p>

                  <div className="list-item-actions">
                    <button
                      className="btn-small btn-small-edit"
                      onClick={() => iniciarEdicion(a)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-small btn-small-delete"
                      onClick={() => eliminar(a.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}