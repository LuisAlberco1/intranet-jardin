import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import "./styles/global.css";

// Punto de entrada de la aplicación. Envuelve App con BrowserRouter y
// los providers de autenticación y datos.
ReactDOM.createRoot(
  // Renderiza la aplicación en el elemento con id "root" del HTML.
  document.getElementById("root")!
// Asegura que el elemento existe antes de renderizar.
).render(
  <React.StrictMode> 
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <App /> 
        </DataProvider> 
      </AuthProvider> 
    </BrowserRouter>
  </React.StrictMode>
);