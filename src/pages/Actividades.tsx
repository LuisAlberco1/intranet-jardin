import { useEffect, useState } from "react";
import type { Actividad } from "../types/Actividad";

export default function Actividades() {
  const [lista, setLista] = useState<Actividad[]>([]);

  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [responsable, setResponsable] = useState("");

  const [editandoId, setEditandoId] = useState<string | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("actividades");

    if (data) {
      setLista(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "actividades",
      JSON.stringify(lista)
    );
  }, [lista]);

  const limpiar = () => {
    setNombre("");
    setFecha("");
    setDescripcion("");
    setResponsable("");
  };

  const agregar = () => {
    if (
      !nombre ||
      !fecha ||
      !descripcion ||
      !responsable
    ) {
      return;
    }

    const nueva: Actividad = {
      id: crypto.randomUUID(),
      nombre,
      fecha,
      descripcion,
      responsable,
    };

    setLista([...lista, nueva]);

    limpiar();
  };

  const eliminar = (id: string) => {
    setLista(
      lista.filter((a) => a.id !== id)
    );
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

    setLista(
      lista.map((a) =>
        a.id === editandoId
          ? {
              ...a,
              nombre,
              fecha,
              descripcion,
              responsable,
            }
          : a
      )
    );

    setEditandoId(null);

    limpiar();
  };

  return (
    <div>
      <h1>Calendario de Actividades</h1>

      <input
        placeholder="Nombre actividad"
        value={nombre}
        onChange={(e) =>
          setNombre(e.target.value)
        }
      />

      <input
        type="date"
        value={fecha}
        onChange={(e) =>
          setFecha(e.target.value)
        }
      />

      <input
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) =>
          setDescripcion(e.target.value)
        }
      />

      <input
        placeholder="Responsable"
        value={responsable}
        onChange={(e) =>
          setResponsable(e.target.value)
        }
      />

      {editandoId ? (
        <button onClick={guardar}>
          Guardar cambios
        </button>
      ) : (
        <button onClick={agregar}>
          Agregar
        </button>
      )}

      <hr />

      {lista.map((a) => (
        <div key={a.id}>
          <h3>{a.nombre}</h3>

          <p>{a.descripcion}</p>

          <p>Fecha: {a.fecha}</p>

          <p>
            Responsable: {a.responsable}
          </p>

          <button
            onClick={() =>
              iniciarEdicion(a)
            }
          >
            Editar
          </button>

          <button
            onClick={() =>
              eliminar(a.id)
            }
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}