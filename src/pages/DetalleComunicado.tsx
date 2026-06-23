import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Comunicado } from "../types/Comunicado";

export default function DetalleComunicado() {
  const { id } = useParams<{ id: string }>();

  const [comunicado, setComunicado] = useState<Comunicado | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = () => {
      try {
        const data = localStorage.getItem("comunicados");

        if (!data) {
          setComunicado(null);
          return;
        }

        const lista: Comunicado[] = JSON.parse(data);

        const encontrado = lista.find((c) => c.id === id);

        setComunicado(encontrado ?? null);
      } catch (error) {
        console.error("Error cargando comunicado:", error);
        setComunicado(null);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [id]);

  if (loading) {
    return <h2>Cargando...</h2>;
  }

  if (!comunicado) {
    return <h2>Comunicado no encontrado</h2>;
  }

  return (
    <div className="container">
      <div className="card">
        <h1>{comunicado.titulo}</h1>

        <p>{comunicado.descripcion}</p>

        <p>
          <b>Categoría:</b> {comunicado.categoria}
        </p>

        <p>
          <b>Fecha:</b>{" "}
          {new Date(comunicado.fecha).toLocaleDateString()}
        </p>

        <p>
          <b>Destacado:</b>{" "}
          {comunicado.destacado ? "Sí" : "No"}
        </p>
      </div>
    </div>
  );
}