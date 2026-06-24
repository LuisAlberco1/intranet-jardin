import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/login.css";

type Credencial = {
  user: string;
  pass: string;
  nombre: string;
  rol: string;
};

export default function Login() {
  // Acceso al contexto de autenticación para ejecutar el login.
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  // Estado local para los campos del formulario y posibles errores.
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Muestra mensaje si el contexto de autenticación no está disponible.
  if (!ctx) {
    return <h2>Error cargando autenticación</h2>;
  }

  const { login } = ctx;

  // Credenciales de prueba utilizadas para autenticación local.
  const credenciales: Credencial[] = [
    {
      user: "admin",
      pass: "1234",
      nombre: "Administrador",
      rol: "Admin",
    },
  ];

  // Maneja el envío del formulario de inicio de sesión.
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!usuario.trim() || !password.trim()) {
      setError("Completa todos los campos");
      return;
    }

    const usuarioEncontrado = credenciales.find(
      (u) => u.user === usuario && u.pass === password
    );

    if (!usuarioEncontrado) {
      setError("Credenciales incorrectas");
      return;
    }

    login({
      user: usuarioEncontrado.user,
    });

    // Redirige al dashboard luego de autenticarse.
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <div className="header-content">
          <img src="/logo.png" alt="Logo Jardín" className="login-logo" />
          <h1>INTRANET</h1>
          <p>JARDÍN INFANTIL</p>
        </div>
      </div>

      <div className="login-main">
        <div className="login-card">
          <div className="card-icon">🏠</div>

          <h2>Bienvenido 👋</h2>
          <p className="subtitle">Ingresa tus credenciales para continuar</p>

          {/* Formulario de autenticación local con validación básica. */}
          <form className="login-form" onSubmit={handleLogin}>
            {/* Campo de usuario con control de estado */}
            <div className="input-group">
              <span className="input-icon">👤</span>
              <input
                type="text"
                placeholder="Usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>

            {/* Campo de contraseña con control de estado */}
            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Botón de envío para autenticar el usuario */}
            <button type="submit" className="btn-login">
              ➤ Ingresar
            </button>
          </form>

          {error && <p className="error-message">{error}</p>}
        </div>
      </div>

      <div className="login-footer">
        <div className="footer-content">
          <p>Juntos formamos el futuro de nuestros niños</p>
          <p>© 2026 Jardín Infantil - Intranet</p>
        </div>
      </div>
    </div>
  );
}