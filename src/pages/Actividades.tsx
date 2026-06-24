import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import type { Actividad } from "../types/Actividad";

export default function Actividades() {
  const ctx = useContext(DataContext);

  if (!ctx) return null;

  const { actividades, setActividades } = ctx;

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

    const fechaActividad = new Date(fecha);
    if (fechaActividad < new Date()) {
      setError("La actividad debe programarse en una fecha futura.");
      return;
    }

    const nueva: Actividad = {
      id: crypto.randomUUID(),
      nombre,
      fecha,
      descripcion,
      responsable,
    };

    setActividades((prev) => [...prev, nueva]);
    limpiar();
  };

  const eliminar = (id: string) => {
    setActividades((prev) => prev.filter((a) => a.id !== id));
  };

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

    if (!nombre || !fecha || !descripcion || !responsable) {
      setError("Por favor completa todos los campos.");
      return;
    }

    const fechaActividad = new Date(fecha);
    if (fechaActividad < new Date()) {
      setError("La actividad debe programarse en una fecha futura.");
      return;
    }

    setActividades((prev) =>
      prev.map((a) =>
        a.id === editandoId
          ? { ...a, nombre, fecha, descripcion, responsable }
          : a
      )
    );

    setEditandoId(null);
    limpiar();
  };

  // Filtra las actividades por nombre o responsable.
  const listaFiltrada = actividades.filter((a) => {
    const q = busqueda.toLowerCase();
    return (
      a.nombre.toLowerCase().includes(q) ||
      a.responsable.toLowerCase().includes(q)
    );
  });

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