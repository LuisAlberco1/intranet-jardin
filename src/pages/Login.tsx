import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const login = ctx?.login;

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const credenciales = {
    user: "admin",
    pass: "1234",
    nombre: "Administrador",
    rol: "admin",
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!usuario || !password) {
      setError("Completa todos los campos");
      return;
    }

    if (
      usuario === credenciales.user &&
      password === credenciales.pass
    ) {
      login?.({
        nombre: credenciales.nombre,
        rol: credenciales.rol,
      });

      navigate("/dashboard");
    } else {
      setError("Credenciales incorrectas");
    }
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

      </div>
    </div>
  );
}