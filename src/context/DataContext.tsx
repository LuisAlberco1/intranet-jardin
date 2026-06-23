import { createContext, useState, useEffect } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

import type { Actividad } from "../types/Actividad";
import type { Comunicado } from "../types/Comunicado";
import type { Reunion } from "../types/Reunion";

type DataContextType = {
  actividades: Actividad[];
  reuniones: Reunion[];
  comunicados: Comunicado[];

  setActividades: Dispatch<SetStateAction<Actividad[]>>;
  setReuniones: Dispatch<SetStateAction<Reunion[]>>;
  setComunicados: Dispatch<SetStateAction<Comunicado[]>>;
};

export const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [reuniones, setReuniones] = useState<Reunion[]>([]);
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);

  // 🔥 carga inicial
  useEffect(() => {
    try {
      setActividades(JSON.parse(localStorage.getItem("actividades") || "[]"));
      setReuniones(JSON.parse(localStorage.getItem("reuniones") || "[]"));
      setComunicados(JSON.parse(localStorage.getItem("comunicados") || "[]"));
    } catch {
      setActividades([]);
      setReuniones([]);
      setComunicados([]);
    }
  }, []);

  // 🔥 persistencia automática
  useEffect(() => {
    localStorage.setItem("actividades", JSON.stringify(actividades));
  }, [actividades]);

  useEffect(() => {
    localStorage.setItem("reuniones", JSON.stringify(reuniones));
  }, [reuniones]);

  useEffect(() => {
    localStorage.setItem("comunicados", JSON.stringify(comunicados));
  }, [comunicados]);

  return (
    <DataContext.Provider
      value={{
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