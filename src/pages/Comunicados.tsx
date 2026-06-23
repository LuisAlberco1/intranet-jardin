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

  const eliminar = (id: string) => {
    setComunicados((prev) => prev.filter((c) => c.id !== id));
  };

  const iniciarEdicion = (c: Comunicado) => {
    setEditandoId(c.id);
    setTitulo(c.titulo);
    setDescripcion(c.descripcion);
    setCategoria(c.categoria);
    setDestacado(c.destacado);
  };

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

  const listaFiltrada = comunicados.filter((c) => {
    const q = busqueda.toLowerCase();
    return (
      c.titulo.toLowerCase().includes(q) ||
      c.categoria.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <h1>Comunicados</h1>

      <input
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <input
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <input
        placeholder="Categoría"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />

      <label>
        Destacado:
        <input
          type="checkbox"
          checked={destacado}
          onChange={(e) => setDestacado(e.target.checked)}
        />
      </label>

      {editandoId ? (
        <button onClick={guardarEdicion}>Guardar cambios</button>
      ) : (
        <button onClick={agregar}>Agregar</button>
      )}

      <hr />

      <input
        placeholder="Buscar"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <hr />

      {listaFiltrada.map((c) => (
        <div key={c.id}>
          <h3>{c.titulo}</h3>
          <p>{c.descripcion}</p>
          <p>Categoría: {c.categoria}</p>
          <p>{new Date(c.fecha).toLocaleDateString()}</p>
          <p>{c.destacado ? "Destacado" : "Normal"}</p>

          <button onClick={() => iniciarEdicion(c)}>Editar</button>
          <button onClick={() => eliminar(c.id)}>Eliminar</button>

          <Link to={`/comunicado/${c.id}`}>
            <button>Ver detalle</button>
          </Link>
        </div>
      ))}
    </div>
  );
}