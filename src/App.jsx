import NavBar from "./routes/NavBar/NavBar";
import { Outlet } from "react-router-dom";

import "./styles/App.css";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </>
  );
}

export default App;
