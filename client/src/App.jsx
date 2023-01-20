import { useSelector } from "react-redux";
import Authentication from "./pages/Authentication/Authentication";
function App() {
  const isLogged = useSelector((state) => state.auth.isLoggedIn);

  return <div className="App">
    <Authentication/>
  </div>;
}

export default App;
