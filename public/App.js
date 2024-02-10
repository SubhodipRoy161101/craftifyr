import "./App.css";
import Home from "./Home";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Login from "./Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
