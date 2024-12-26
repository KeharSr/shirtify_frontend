import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />


      </Routes>
    </Router>
  );
}

export default App;
