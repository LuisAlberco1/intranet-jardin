import { useEffect, useState } from "react";
import type { Reunion } from "../types/Reunion";

export default function Reuniones() {
  const [lista, setLista] = useState<Reunion[]>([]);

  const [titulo, setTitulo] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [editandoId, setEditandoId] = useState<string | null>(null);

  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("reuniones");

    if (data) {
      setLista(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "reuniones",
      JSON.stringify(lista)
    );
  }, [lista]);

  const limpiar = () => {
    setTitulo("");
    setFecha("");
    setHora("");
    setDescripcion("");
  };

  const agregar = () => {
    if (
      !titulo ||
      !fecha ||
      !hora ||
      !descripcion
    ) {
      return;
    }

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

  const eliminar = (id: string) => {
    setLista(
      lista.filter(
        (r) => r.id !== id
      )
    );
  };

  const iniciarEdicion = (
    r: Reunion
  ) => {
    setEditandoId(r.id);

    setTitulo(r.titulo);
    setFecha(r.fecha);
    setHora(r.hora);
    setDescripcion(r.descripcion);
  };

  const guardar = () => {
    if (!editandoId) return;

    setLista(
      lista.map((r) =>
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

  const listaFiltrada = lista.filter(
    (r) =>
      r.titulo
        .toLowerCase()
        .includes(
          busqueda.toLowerCase()
        )
  );

  return (
    <div>
      <h1>Reuniones de Apoderados</h1>

      <input
        placeholder="Título"
        value={titulo}
        onChange={(e) =>
          setTitulo(e.target.value)
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
        type="time"
        value={hora}
        onChange={(e) =>
          setHora(e.target.value)
        }
      />

      <input
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) =>
          setDescripcion(
            e.target.value
          )
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

      <input
        placeholder="Buscar reunión"
        value={busqueda}
        onChange={(e) =>
          setBusqueda(
            e.target.value
          )
        }
      />

      <hr />

      {listaFiltrada.map((r) => (
        <div key={r.id}>
          <h3>{r.titulo}</h3>

          <p>{r.descripcion}</p>

          <p>
            {r.fecha} - {r.hora}
          </p>

          <button
            onClick={() =>
              iniciarEdicion(r)
            }
          >
            Editar
          </button>

          <button
            onClick={() =>
              eliminar(r.id)
            }
          >
            Eliminar
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}