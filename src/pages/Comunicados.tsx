import { useEffect, useState } from "react";
import type { Comunicado } from "../types/Comunicado";

export default function Comunicados() {
  const [lista, setLista] = useState<Comunicado[]>([]);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [destacado, setDestacado] = useState(false);

  const [editandoId, setEditandoId] = useState<string | null>(null);

  // cargar desde localStorage
  useEffect(() => {
    const data = localStorage.getItem("comunicados");
    if (data) setLista(JSON.parse(data));
  }, []);

  // guardar en localStorage
  useEffect(() => {
    localStorage.setItem("comunicados", JSON.stringify(lista));
  }, [lista]);

  // agregar comunicado
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

    setLista([...lista, nuevo]);

    limpiarFormulario();
  };

  // eliminar comunicado
  const eliminar = (id: string) => {
    setLista(lista.filter((item) => item.id !== id));
  };

  // iniciar edición
  const iniciarEdicion = (c: Comunicado) => {
    setEditandoId(c.id);
    setTitulo(c.titulo);
    setDescripcion(c.descripcion);
    setCategoria(c.categoria);
    setDestacado(c.destacado);
  };

  // guardar edición
  const guardarEdicion = () => {
    if (!editandoId) return;

    setLista(
      lista.map((item) =>
        item.id === editandoId
          ? {
              ...item,
              titulo,
              descripcion,
              categoria,
              destacado,
            }
          : item
      )
    );

    setEditandoId(null);
    limpiarFormulario();
  };

  // limpiar formulario
  const limpiarFormulario = () => {
    setTitulo("");
    setDescripcion("");
    setCategoria("");
    setDestacado(false);
  };

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

      {lista.map((c) => (
        <div key={c.id}>
          <h3>{c.titulo}</h3>
          <p>{c.descripcion}</p>
          <p>Categoría: {c.categoria}</p>
          <p>Fecha: {new Date(c.fecha).toLocaleDateString()}</p>
          <p>Destacado: {c.destacado ? "Sí" : "No"}</p>

          <button onClick={() => iniciarEdicion(c)}>
            Editar
          </button>

          <button onClick={() => eliminar(c.id)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}