import { useEffect, useState } from "react";
import type { Reunion } from "../types/Reunion";

export default function Reuniones() {
  const [lista, setLista] = useState<Reunion[]>([]);

  const [titulo, setTitulo] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [editandoId, setEditandoId] = useState<string | null>(null);

  // cargar desde localStorage
  useEffect(() => {
    const data = localStorage.getItem("reuniones");
    if (data) setLista(JSON.parse(data));
  }, []);

  // guardar en localStorage
  useEffect(() => {
    localStorage.setItem("reuniones", JSON.stringify(lista));
  }, [lista]);

  // limpiar formulario
  const limpiar = () => {
    setTitulo("");
    setFecha("");
    setHora("");
    setDescripcion("");
  };

  // agregar
  const agregar = () => {
    if (!titulo || !fecha || !hora || !descripcion) return;

    const nueva: Reunion = {
      id: crypto.randomUUID(),
      titulo,
      fecha,
      hora,
      descripcion,
    };

    setLista([...lista, nueva]);
    limpiar();
  };

  // eliminar
  const eliminar = (id: string) => {
    setLista(lista.filter((r) => r.id !== id));
  };

  // iniciar edición
  const iniciarEdicion = (r: Reunion) => {
    setEditandoId(r.id);
    setTitulo(r.titulo);
    setFecha(r.fecha);
    setHora(r.hora);
    setDescripcion(r.descripcion);
  };

  // guardar edición
  const guardar = () => {
    if (!editandoId) return;

    setLista(
      lista.map((r) =>
        r.id === editandoId
          ? { ...r, titulo, fecha, hora, descripcion }
          : r
      )
    );

    setEditandoId(null);
    limpiar();
  };

  return (
    <div>
      <h1>Reuniones de Apoderados</h1>

      <input
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />

      <input
        type="time"
        value={hora}
        onChange={(e) => setHora(e.target.value)}
      />

      <input
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      {editandoId ? (
        <button onClick={guardar}>Guardar cambios</button>
      ) : (
        <button onClick={agregar}>Agregar</button>
      )}

      <hr />

      {lista.map((r) => (
        <div key={r.id}>
          <h3>{r.titulo}</h3>
          <p>{r.descripcion}</p>
          <p>{r.fecha} - {r.hora}</p>

          <button onClick={() => iniciarEdicion(r)}>Editar</button>
          <button onClick={() => eliminar(r.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}