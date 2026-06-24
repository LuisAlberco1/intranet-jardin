import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import type { Comunicado } from "../types/Comunicado";

export default function Comunicados() {
  const ctx = useContext(DataContext);

  if (!ctx) return null;

  const { comunicados, setComunicados } = ctx;

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [destacado, setDestacado] = useState(false);

  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");

  const limpiarFormulario = () => {
    setTitulo("");
    setDescripcion("");
    setCategoria("");
    setDestacado(false);
  };

  // Crea un nuevo comunicado y limpia el formulario.
  // Agrega un nuevo comunicado con los datos ingresados en el formulario.
  const agregar = () => {
    if (!titulo || !descripcion || !categoria) return;

    const nuevo: Comunicado = {
      id: crypto.randomUUID(),
      titulo,
      descripcion,
      categoria,
      fecha: new Date().toISOString(),
      destacado,
    };

    setComunicados((prev) => [...prev, nuevo]);
    limpiarFormulario();
  };

  // Elimina un comunicado por su id.
  const eliminar = (id: string) => {
    setComunicados((prev) => prev.filter((c) => c.id !== id));
  };

  // Carga la información del comunicado en el formulario para editar.
  const iniciarEdicion = (c: Comunicado) => {
    setEditandoId(c.id);
    setTitulo(c.titulo);
    setDescripcion(c.descripcion);
    setCategoria(c.categoria);
    setDestacado(c.destacado);
  };

  // Guarda los cambios en un comunicado existente.
  // Guarda los cambios de edición en un comunicado.
  const guardarEdicion = () => {
    if (!editandoId) return;

    setComunicados((prev) =>
      prev.map((c) =>
        c.id === editandoId
          ? { ...c, titulo, descripcion, categoria, destacado }
          : c
      )
    );

    setEditandoId(null);
    limpiarFormulario();
  };

  // Filtra la lista de comunicados por título o categoría.
  // Filtra la lista de comunicados por título o categoría.
  // Filtra comunicados por título o categoría para la búsqueda.
  const listaFiltrada = comunicados.filter((c) => {
    const q = busqueda.toLowerCase();
    return (
      c.titulo.toLowerCase().includes(q) ||
      c.categoria.toLowerCase().includes(q)
    );
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📢 Comunicados</h1>
        <p>Administra y gestiona todos los comunicados internos</p>
      </div>

      <div className="page-content">
        {/* FORM */}
        <div className="form-section">
          <h2>{editandoId ? "Editar" : "Nuevo"} Comunicado</h2>

          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              placeholder="Ej: Cierre por feriado"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              placeholder="Contenido del comunicado..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Categoría</label>
            <input
              type="text"
              placeholder="Ej: Administrativo, Actividades, etc."
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="destacado"
              checked={destacado}
              onChange={(e) => setDestacado(e.target.checked)}
            />
            <label htmlFor="destacado">Marcar como destacado</label>
          </div>

          <div className="form-buttons">
            {editandoId ? (
              <>
                <button className="btn-primary" onClick={guardarEdicion}>
                  Guardar cambios
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setEditandoId(null);
                    limpiarFormulario();
                  }}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button className="btn-primary" onClick={agregar}>
                Crear comunicado
              </button>
            )}
          </div>
        </div>

        {/* LISTA DE COMUNICADOS */}
        <div className="list-section">
          <div className="list-header">
            <h2>Lista de Comunicados</h2>
            <input
              type="text"
              className="search-box"
              placeholder="🔍 Buscar comunicados..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          {listaFiltrada.length === 0 ? (
            <div className="empty-state">
              <p>📭 No hay comunicados aún</p>
            </div>
          ) : (
            <div className="list-items">
              {listaFiltrada.map((c) => (
                <div key={c.id} className="list-item">
                  <div className="list-item-header">
                    <h3 className="list-item-title">
                      {c.destacado && "⭐ "}
                      {c.titulo}
                    </h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span
                        style={{
                          background: '#dbeafe',
                          color: '#0c4a6e',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                        }}
                      >
                        {c.categoria}
                      </span>
                    </div>
                  </div>

                  <div className="list-item-meta">
                    <span>📅 {new Date(c.fecha).toLocaleDateString()}</span>
                    {c.destacado && <span>⭐ Destacado</span>}
                  </div>

                  <p className="list-item-content">{c.descripcion}</p>

                  <div className="list-item-actions">
                    <button
                      className="btn-small btn-small-edit"
                      onClick={() => iniciarEdicion(c)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-small btn-small-delete"
                      onClick={() => eliminar(c.id)}
                    >
                      Eliminar
                    </button>
                    <Link to={`/comunicado/${c.id}`} style={{ textDecoration: 'none' }}>
                      <button className="btn-small btn-small-edit">
                        Ver detalle
                      </button>
                    </Link>
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