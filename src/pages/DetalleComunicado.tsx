import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Comunicado } from "../types/Comunicado";

export default function DetalleComunicado() {
  const { id } = useParams();

  const [comunicado, setComunicado] =
    useState<Comunicado | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("comunicados");

    if (!data) return;

    const lista: Comunicado[] =
      JSON.parse(data);

    const encontrado =
      lista.find((c) => c.id === id);

    if (encontrado) {
      setComunicado(encontrado);
    }
  }, [id]);

  if (!comunicado) {
    return <h2>Comunicado no encontrado</h2>;
  }

  return (
    <div>
      <h1>{comunicado.titulo}</h1>

      <p>{comunicado.descripcion}</p>

      <p>
        Categoría:
        {" "}
        {comunicado.categoria}
      </p>

      <p>
        Fecha:
        {" "}
        {new Date(
          comunicado.fecha
        ).toLocaleDateString()}
      </p>

      <p>
        Destacado:
        {" "}
        {comunicado.destacado
          ? "Sí"
          : "No"}
      </p>
    </div>
  );
}