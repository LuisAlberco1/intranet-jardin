import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import type { Comunicado } from "../types/Comunicado";
import { DataContext } from "../context/DataContext";

// Página de detalle de un comunicado específico. Muestra la información completa del comunicado seleccionado.
export default function DetalleComunicado() {
  const { id } = useParams<{ id: string }>();

  // Estado local para almacenar el comunicado cargado y el estado de carga.
  const [comunicado, setComunicado] = useState<Comunicado | null>(null);
  const [loading, setLoading] = useState(true);

  // Acceso al contexto de datos para obtener la lista de comunicados.
  const dataCtx = useContext(DataContext);

  // Carga el comunicado por id desde el contexto o localStorage.
  useEffect(() => {
    const cargar = () => {
      try {
        // Primero intentar desde el contexto (estado en memoria)
        const listaCtx = dataCtx?.comunicados;
        const encontradoCtx = listaCtx?.find((c) => c.id === id) ?? null;

        // Si se encuentra en el contexto, se establece directamente.
        if (encontradoCtx) {
          setComunicado(encontradoCtx);
          return;
        }

        // Fallback: leer desde localStorage si no está en contexto
        const data = localStorage.getItem("comunicados");
        if (!data) {
          setComunicado(null);
          return;
        }

        // Parsear la lista de comunicados desde localStorage y buscar el comunicado por id.
        const lista: Comunicado[] = JSON.parse(data);
        const encontrado = lista.find((c) => c.id === id) ?? null; // Si no se encuentra, retorna null
        setComunicado(encontrado);
      } catch (error) { // Manejo de errores al cargar el comunicado
        console.error("Error cargando comunicado:", error);
        setComunicado(null);
      } finally { // Asegura que el estado de carga se actualice al finalizar la operación
        setLoading(false); // Se marca como finalizada la carga, independientemente de si se encontró el comunicado o no.
      }
    };

    cargar();
    // Dependemos de id y del contexto para reaccionar si la lista cambia
  }, [id, dataCtx?.comunicados]);

  if (loading) { // Muestra un mensaje de carga mientras se obtiene el comunicado
    // Renderiza un mensaje de carga mientras se obtiene el comunicado
    return (
      <div className="page-container">
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p style={{ fontSize: '18px', color: '#64748b' }}>
            ⏳ Cargando comunicado...
          </p>
        </div>
      </div>
    );
  }

  if (!comunicado) { // Muestra un mensaje de error si no se encuentra el comunicado
    // Renderiza un mensaje de error si no se encuentra el comunicado
    return (
      <div className="page-container">
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p style={{ fontSize: '18px', color: '#ef4444' }}>
            ❌ Comunicado no encontrado
          </p>
        </div>
      </div>
    );
  }

  // Renderiza la información completa del comunicado si se encuentra
  return ( 
    <div className="page-container">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '30px' }}>
          <Link to="/comunicados" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#3b82f6',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            ← Volver a Comunicados
          </Link>
        </div>

        <div className="list-section" style={{ padding: '40px' }}>
          <div style={{ marginBottom: '30px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '15px'
            }}>
              <h1 style={{ margin: 0, color: '#1e293b', fontSize: '32px' }}>
                {comunicado.destacado && '⭐ '}
                {comunicado.titulo}
              </h1>
            </div>

            <div style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              fontSize: '14px',
              color: '#64748b'
            }}>
              <span>
                <strong>📅 Fecha:</strong> {new Date(comunicado.fecha).toLocaleDateString()}
              </span>
              <span style={{
                background: '#dbeafe',
                color: '#0c4a6e',
                padding: '6px 12px',
                borderRadius: '12px',
                fontWeight: '600'
              }}>
                {comunicado.categoria}
              </span>
              {comunicado.destacado && (
                <span style={{
                  background: '#fef08a',
                  color: '#7c2d12',
                  padding: '6px 12px',
                  borderRadius: '12px',
                  fontWeight: '600'
                }}>
                  ⭐ Destacado
                </span>
              )}
            </div>
          </div>

          <div style={{
            borderTop: '2px solid #e2e8f0',
            paddingTop: '30px'
          }}>
            <div style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#475569',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word'
            }}>
              {comunicado.descripcion}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}