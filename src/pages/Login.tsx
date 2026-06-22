import { useState } from "react";

export default function Login() {
  // estados del formulario
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  // errores
  const [error, setError] = useState("");

  // credenciales simuladas 
  const credenciales = {
    user: "admin",
    pass: "1234",
    nombre: "Administrador",
    rol: "admin",
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    // validación básica
    if (!usuario || !password) {
      setError("Completa todos los campos");
      return;
    }

    // validar credenciales
    if (
      usuario === credenciales.user &&
      password === credenciales.pass
    ) {
      // crear sesión
      const session = {
        nombre: credenciales.nombre,
        rol: credenciales.rol,
      };

      // guardar en localStorage
      localStorage.setItem("session", JSON.stringify(session));

      // redirigir 
      window.location.href = "/dashboard";
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "auto" }}>
      <h2>Login Intranet</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Ingresar</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}