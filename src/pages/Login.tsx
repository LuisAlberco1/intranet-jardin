import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type Credencial = {
  user: string;
  pass: string;
  nombre: string;
  rol: string;
};

export default function Login() {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // seguridad TS
  if (!ctx) {
    return <h2>Error cargando autenticación</h2>;
  }

  const { login } = ctx;

  // simulación de usuarios
  const credenciales: Credencial[] = [
    {
      user: "admin",
      pass: "1234",
      nombre: "Administrador",
      rol: "Admin",
    },
  ];

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!usuario.trim() || !password.trim()) {
      setError("Completa todos los campos");
      return;
    }

    const usuarioEncontrado = credenciales.find(
      (u) =>
        u.user === usuario &&
        u.pass === password
    );

    if (!usuarioEncontrado) {
      setError("Credenciales incorrectas");
      return;
    }

    login({
      nombre: usuarioEncontrado.nombre,
      rol: usuarioEncontrado.rol,
    });

    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2>🏫 Login Intranet</h2>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) =>
              setUsuario(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Ingresar
          </button>
        </form>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <hr />

        <small>
          Usuario: admin
          <br />
          Contraseña: 1234
        </small>

      </div>
    </div>
  );
}