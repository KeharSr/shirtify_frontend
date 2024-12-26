import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import AdminRoutes from "./pages/protected_routes/AdminRoutes";
import AdminPage from "./pages/admin/AdminPage";
import EditAdminProfile from "./pages/admin/EditProfile";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Protected Routes */}
        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/adminprofile" element={<EditAdminProfile />} />
          {/* <Route path='/add-product' element={<AddProduct />} /> */}
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
