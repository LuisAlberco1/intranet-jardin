export default function Dashboard() {

  const logout = () => {
    localStorage.removeItem("session");
    window.location.reload();
  };

  return (
    <div>
      <h1>Dashboard Intranet</h1>
      <p>Bienvenido al sistema</p>

      <button onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
}