import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import type { Reunion } from "../types/Reunion";

export default function Reuniones() {
  const ctx = useContext(DataContext);

  if (!ctx) return null;

  const { reuniones, setReuniones } = ctx;

  const [titulo, setTitulo] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");

  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const hoy = new Date().toISOString().split("T")[0];

  const limpiar = () => {
    setTitulo("");
    setFecha("");
    setHora("");
    setDescripcion("");
    setError("");
  };

  const fechaHoraValida = (fecha: string, hora: string) => {
    if (!fecha || !hora) return false;
    const fechaHora = new Date(`${fecha}T${hora}`);
    return fechaHora >= new Date();
  };

  const agregar = () => {
    if (!titulo || !fecha || !hora || !descripcion) {
      setError("Por favor completa todos los campos.");
      return;
    }

    if (!fechaHoraValida(fecha, hora)) {
      setError("La reunión debe programarse en una fecha y hora futuras.");
      return;
    }

    const nueva: Reunion = {
      id: crypto.randomUUID(),
      titulo,
      fecha,
      hora,
      descripcion,
    };

    setReuniones((prev) => [...prev, nueva]);
    limpiar();
  };

  const eliminar = (id: string) => {
    setReuniones((prev) => prev.filter((r) => r.id !== id));
  };

  const iniciarEdicion = (r: Reunion) => {
    setEditandoId(r.id);
    setTitulo(r.titulo);
    setFecha(r.fecha);
    setHora(r.hora);
    setDescripcion(r.descripcion);
  };

  const guardar = () => {
    if (!editandoId) return;

    if (!titulo || !fecha || !hora || !descripcion) {
      setError("Por favor completa todos los campos.");
      return;
    }

    if (!fechaHoraValida(fecha, hora)) {
      setError("La reunión debe programarse en una fecha y hora futuras.");
      return;
    }

    setReuniones((prev) =>
      prev.map((r) =>
        r.id === editandoId
          ? {
              ...r,
              titulo,
              fecha,
              hora,
              descripcion,
            }
          : r
      )
    );

    setEditandoId(null);
    limpiar();
  };

  const listaFiltrada = reuniones.filter((r) => {
    const q = busqueda.toLowerCase();
    return r.titulo.toLowerCase().includes(q);
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>👨‍👩‍👧 Reuniones de Apoderados</h1>
        <p>Gestiona las reuniones con los apoderados</p>
      </div>

      <div className="page-content">
        {/* FORM */}
        <div className="form-section">
          <h2>{editandoId ? "Editar" : "Nueva"} Reunión</h2>

          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              placeholder="Ej: Reunión de padres primer trimestre"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
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
            <label>Hora</label>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              placeholder="Detalles de la reunión..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          {error && <div className="form-error">{error}</div>}

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
                Crear reunión
              </button>
            )}
          </div>
        </div>

        {/* LIST */}
        <div className="list-section">
          <div className="list-header">
            <h2>Próximas Reuniones</h2>
            <input
              type="text"
              className="search-box"
              placeholder="🔍 Buscar reuniones..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          {listaFiltrada.length === 0 ? (
            <div className="empty-state">
              <p>📭 No hay reuniones programadas</p>
            </div>
          ) : (
            <div className="list-items">
              {listaFiltrada.map((r) => (
                <div key={r.id} className="list-item">
                  <div className="list-item-header">
                    <h3 className="list-item-title">{r.titulo}</h3>
                  </div>

                  <div className="list-item-meta">
                    <span>📅 {new Date(r.fecha).toLocaleDateString()}</span>
                    <span>🕐 {r.hora}</span>
                  </div>

                  <p className="list-item-content">{r.descripcion}</p>

                  <div className="list-item-actions">
                    <button
                      className="btn-small btn-small-edit"
                      onClick={() => iniciarEdicion(r)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-small btn-small-delete"
                      onClick={() => eliminar(r.id)}
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