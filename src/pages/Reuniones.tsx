import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import type { Reunion } from "../types/Reunion";

// Página de administración de reuniones. Permite crear, editar, eliminar y buscar reuniones.
export default function Reuniones() {
  const ctx = useContext(DataContext);

  // Si el contexto no está disponible, no renderiza nada.
  if (!ctx) return null;

  // Extrae las reuniones y la función para actualizar la lista desde el contexto.
  const { reuniones, setReuniones } = ctx;

  // Estados locales para manejar los campos del formulario y la búsqueda.
  const [titulo, setTitulo] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");

  // Estados locales para manejar la edición y la búsqueda de reuniones.
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const hoy = new Date().toISOString().split("T")[0];

  // Fecha mínima para evitar reuniones con fecha pasada.

  // Fecha mínima usada en los inputs para evitar reuniones en el pasado.

  // Limpia los campos del formulario y el error.
  const limpiar = () => {
    setTitulo("");
    setFecha("");
    setHora("");
    setDescripcion("");
    setError("");
  };

  // Valida que la reunión sea futura y tenga fecha y hora.
  // Valida que la reunión tenga fecha y hora en el futuro.
  const fechaHoraValida = (fecha: string, hora: string) => {
    if (!fecha || !hora) return false;
    const fechaHora = new Date(`${fecha}T${hora}`); // Combina fecha y hora para crear un objeto Date
    return fechaHora >= new Date(); // Devuelve true si la fecha y hora son futuras o actuales
  };

  // Agrega una nueva reunión validando los campos y la fecha.
  // Crea una nueva reunión y valida el formulario.
  const agregar = () => {
    if (!titulo || !fecha || !hora || !descripcion) { // Valida que todos los campos estén completos
      setError("Por favor completa todos los campos.");
      return;
    }

    // Valida que la fecha y hora de la reunión sean futuras.
    if (!fechaHoraValida(fecha, hora)) {
      setError("La reunión debe programarse en una fecha y hora futuras.");
      return;
    }

    // Crea un nuevo objeto de reunión con un ID único y los datos del formulario.
    const nueva: Reunion = {
      id: crypto.randomUUID(),
      titulo,
      fecha,
      hora,
      descripcion,
    };

    // Agrega la nueva reunión a la lista en el contexto y limpia el formulario.
    setReuniones((prev) => [...prev, nueva]);
    limpiar();
  };

  // Elimina una reunión por su ID.
  const eliminar = (id: string) => {
    setReuniones((prev) => prev.filter((r) => r.id !== id));
  };

  // Carga los datos de una reunión en el formulario para editarla.
  const iniciarEdicion = (r: Reunion) => {
    setEditandoId(r.id);
    setTitulo(r.titulo);
    setFecha(r.fecha);
    setHora(r.hora);
    setDescripcion(r.descripcion);
  };

  // Guarda los cambios de una reunión que se está editando.
  // Guarda los cambios para una reunión que está en modo edición.
  const guardar = () => {
    if (!editandoId) return;

    // Valida que todos los campos estén completos y que la fecha y hora sean futuras.
    if (!titulo || !fecha || !hora || !descripcion) {
      setError("Por favor completa todos los campos.");
      return;
    }

    // Valida que la fecha y hora de la reunión sean futuras.
    if (!fechaHoraValida(fecha, hora)) {
      setError("La reunión debe programarse en una fecha y hora futuras.");
      return;
    }

    // Actualiza la reunión en la lista del contexto con los nuevos datos.
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

    // Limpia el formulario y sale del modo edición.
    setEditandoId(null);
    limpiar();
  };

  // Aplica filtro de búsqueda a las reuniones por título.
  const listaFiltrada = reuniones.filter((r) => {
    const q = busqueda.toLowerCase();
    return r.titulo.toLowerCase().includes(q);
  });

  // Renderiza la página de reuniones con el formulario y la lista de reuniones.
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