import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/login.css";

export default function Login() {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!ctx) {
    return <h2>Error cargando autenticación</h2>;
  }

  const { login } = ctx;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Completa todos los campos");
      return;
    }

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      // errores Firebase más comunes
      switch (err.code) {
        case "auth/user-not-found":
          setError("Usuario no encontrado");
          break;
        case "auth/wrong-password":
          setError("Contraseña incorrecta");
          break;
        case "auth/invalid-email":
          setError("Email inválido");
          break;
        default:
          setError("Error al iniciar sesión");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <div className="header-content">
          <img src="/logo.png" alt="Logo Jardín" className="login-logo" />
          <h1>Intranet Jardín Infantil</h1>
          <p>Plataforma de Gestión y Comunicación Interna del Jardín</p>
        </div>
      </div>

      <div className="login-main">
        <div className="login-card">
          <div className="card-icon">🏠</div>

          <h2>Bienvenido 👋</h2>
          <p className="subtitle">Ingresa tus credenciales para continuar</p>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <span className="input-icon">📧</span>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

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