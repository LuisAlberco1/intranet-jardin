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

  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");

  const limpiar = () => {
    setNombre("");
    setFecha("");
    setDescripcion("");
    setResponsable("");
  };

  const agregar = () => {
    if (!nombre || !fecha || !descripcion || !responsable) return;

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

  const guardar = () => {
    if (!editandoId) return;

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

  const listaFiltrada = actividades.filter((a) => {
    const q = busqueda.toLowerCase();
    return (
      a.nombre.toLowerCase().includes(q) ||
      a.responsable.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <h1>Calendario de Actividades</h1>

      <input
        placeholder="Nombre actividad"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />

      <input
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <input
        placeholder="Responsable"
        value={responsable}
        onChange={(e) => setResponsable(e.target.value)}
      />

      {editandoId ? (
        <button onClick={guardar}>Guardar cambios</button>
      ) : (
        <button onClick={agregar}>Agregar</button>
      )}

      <hr />

      <input
        placeholder="Buscar actividad o responsable"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <hr />

      {listaFiltrada.map((a) => (
        <div key={a.id}>
          <h3>{a.nombre}</h3>
          <p>{a.descripcion}</p>
          <p>Fecha: {a.fecha}</p>
          <p>Responsable: {a.responsable}</p>

          <button onClick={() => iniciarEdicion(a)}>Editar</button>
          <button onClick={() => eliminar(a.id)}>Eliminar</button>

          <hr />
        </div>
      ))}
    </div>
  );
}