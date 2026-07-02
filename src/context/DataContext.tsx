import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/config";

import type { Actividad } from "../types/Actividad";
import type { Comunicado } from "../types/Comunicado";
import type { Reunion } from "../types/Reunion";

type DataContextType = {
  actividades: Actividad[];
  reuniones: Reunion[];
  comunicados: Comunicado[];

  addActividad: (a: Omit<Actividad, "id">) => Promise<void>;
  updateActividad: (id: string, data: Partial<Actividad>) => Promise<void>;
  deleteActividad: (id: string) => Promise<void>;

  addReunion: (r: Omit<Reunion, "id">) => Promise<void>;
  updateReunion: (id: string, data: Partial<Reunion>) => Promise<void>;
  deleteReunion: (id: string) => Promise<void>;

  addComunicado: (c: Omit<Comunicado, "id">) => Promise<void>;
  updateComunicado: (id: string, data: Partial<Comunicado>) => Promise<void>;
  deleteComunicado: (id: string) => Promise<void>;
};

export const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [reuniones, setReuniones] = useState<Reunion[]>([]);
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);

  // ======================
  // 🔥 REALTIME LISTENERS
  // ======================

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "actividades"), (snap) => {
      setActividades(
        snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Actividad, "id">),
        }))
      );
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "reuniones"), (snap) => {
      setReuniones(
        snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Reunion, "id">),
        }))
      );
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "comunicados"), (snap) => {
      setComunicados(
        snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Comunicado, "id">),
        }))
      );
    });

    return () => unsub();
  }, []);

  // ======================
  // 🔥 CRUD ACTIVIDADES
  // ======================

  const addActividad = async (a: Omit<Actividad, "id">) => {
    await addDoc(collection(db, "actividades"), a);
  };

  const updateActividad = async (id: string, data: Partial<Actividad>) => {
    await updateDoc(doc(db, "actividades", id), data);
  };

  const deleteActividad = async (id: string) => {
    await deleteDoc(doc(db, "actividades", id));
  };

  // ======================
  // 🔥 CRUD REUNIONES
  // ======================

  const addReunion = async (r: Omit<Reunion, "id">) => {
    await addDoc(collection(db, "reuniones"), r);
  };

  const updateReunion = async (id: string, data: Partial<Reunion>) => {
    await updateDoc(doc(db, "reuniones", id), data);
  };

  const deleteReunion = async (id: string) => {
    await deleteDoc(doc(db, "reuniones", id));
  };

  // ======================
  // 🔥 CRUD COMUNICADOS
  // ======================

  const addComunicado = async (c: Omit<Comunicado, "id">) => {
    await addDoc(collection(db, "comunicados"), c);
  };

  const updateComunicado = async (id: string, data: Partial<Comunicado>) => {
    await updateDoc(doc(db, "comunicados", id), data);
  };

  const deleteComunicado = async (id: string) => {
    await deleteDoc(doc(db, "comunicados", id));
  };

  return (
    <DataContext.Provider
      value={{
        actividades,
        reuniones,
        comunicados,

        addActividad,
        updateActividad,
        deleteActividad,

        addReunion,
        updateReunion,
        deleteReunion,

        addComunicado,
        updateComunicado,
        deleteComunicado,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}