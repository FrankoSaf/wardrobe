import { useSelector } from "react-redux";
import Authentication from "./pages/Authentication/Authentication";
import { Routes, Route } from "react-router-dom";

function App() {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<Authentication />} />
      </Routes>
    </div>
  );
}

export default App;
