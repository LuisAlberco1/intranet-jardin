import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const session = localStorage.getItem("session");

  return session ? <Dashboard /> : <Login />;
}

export default App;