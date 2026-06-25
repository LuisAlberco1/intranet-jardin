import { createContext, useState, useEffect } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

import type { Actividad } from "../types/Actividad";
import type { Comunicado } from "../types/Comunicado";
import type { Reunion } from "../types/Reunion";

// Tipo para el contexto de datos que incluye listas de actividades, reuniones y comunicados, así como funciones para actualizar estas listas.
type DataContextType = { 
  actividades: Actividad[];
  reuniones: Reunion[];
  comunicados: Comunicado[];

  setActividades: Dispatch<SetStateAction<Actividad[]>>; // Función para actualizar la lista de actividades.
  setReuniones: Dispatch<SetStateAction<Reunion[]>>; // Función para actualizar la lista de reuniones.
  setComunicados: Dispatch<SetStateAction<Comunicado[]>>; // Función para actualizar la lista de comunicados.
};

// Creación del contexto de datos con un valor inicial nulo.
export const DataContext = createContext<DataContextType | null>(null);

// Proveedor de datos que envuelve la aplicación y proporciona el contexto de datos a todos los componentes hijos.
export function DataProvider({ children }: { children: ReactNode }) {
  const [actividades, setActividades] = useState<Actividad[]>([]); // Estado para almacenar la lista de actividades.
  const [reuniones, setReuniones] = useState<Reunion[]>([]); // Estado para almacenar la lista de reuniones.
  const [comunicados, setComunicados] = useState<Comunicado[]>([]); // Estado para almacenar la lista de comunicados.

  // Carga inicial de datos desde localStorage cuando el provider monta.
  useEffect(() => { // Intenta cargar las listas
    try {
      setActividades(JSON.parse(localStorage.getItem("actividades") || "[]")); // Carga las actividades desde localStorage o inicializa como un array vacío.
      setReuniones(JSON.parse(localStorage.getItem("reuniones") || "[]"));  // Carga las reuniones desde localStorage o inicializa como un array vacío.
      setComunicados(JSON.parse(localStorage.getItem("comunicados") || "[]")); // Carga los comunicados desde localStorage o inicializa como un array vacío.
    } catch { // En caso de error al parsear los datos, inicializa las listas como vacías.
      setActividades([]); // Inicializa la lista de actividades como vacía.
      setReuniones([]); // Inicializa la lista de reuniones como vacía.
      setComunicados([]); // Inicializa la lista de comunicados como vacía.
    }
  }, []); // Dependencia vacía para que se ejecute solo una vez al montar el componente.

  // Actualiza localStorage cada vez que cambian las listas en memoria.
  useEffect(() => {
    localStorage.setItem("actividades", JSON.stringify(actividades));
  }, [actividades]);

  useEffect(() => {
    localStorage.setItem("reuniones", JSON.stringify(reuniones));
  }, [reuniones]);

  useEffect(() => {
    localStorage.setItem("comunicados", JSON.stringify(comunicados));
  }, [comunicados]);

  // Renderiza el proveedor de datos con el valor del contexto.
  return (
    <DataContext.Provider 
      value={{ // Proporciona el valor del contexto que incluye las listas y las funciones para actualizarlas.
        actividades, 
        setActividades, 
        reuniones,
        setReuniones,
        comunicados,
        setComunicados,
      }}
    >
      {children} 
    </DataContext.Provider>
  );
}