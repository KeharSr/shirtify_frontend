import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import AdminRoutes from "./pages/protected_routes/AdminRoutes";
import AdminPage from "./pages/admin/AdminPage";
import EditAdminProfile from "./pages/admin/EditProfile";
import UserRoutes from "./pages/protected_routes/UserRoutes";
import HomePage from "./pages/homepage/HomePage";
import ProductDetails from "./pages/product_details/ProductDetails";
import MyOrders from "./pages/my_order/MyOrder";
import PlaceOrder from "./pages/placeorder/PlaceOrder";
import ShortSleeves from "./pages/sleeves/ShortSleeves";
import LongSleeves from "./pages/sleeves/LongSleeves";
import Cart from "./pages/Cart/Cart";
import EditProfile from "./pages/edit_profile/Edit_Profile";
import Favorites from "./pages/favourites/Favourites";
import HelpDocumentation from "./pages/documentation/Documentation";
import LandingPage from "./pages/LandingPage";
import ForgetPassword from "./pages/forgetpassword/ForgetPassword";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage/>} />

        {/* Admin Protected Routes */}
        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/adminprofile" element={<EditAdminProfile />} />
          {/* <Route path='/add-product' element={<AddProduct />} /> */}
        </Route>

        {/* User Protected Routes */}
        <Route element={<UserRoutes />}>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/myorder" element={<MyOrders />} />
          <Route path="/placeorder/:cart" element={<PlaceOrder />} />
          <Route path="/shortsleeves" element={<ShortSleeves />} />
          <Route path="/longsleeves" element={<LongSleeves />} />
          <Route path="/addtocart" element={< Cart/>} />
          <Route path="/profile" element={< EditProfile/>} />
          <Route path="/favourites" element={<Favorites/>} />
          <Route path="/help" element={<HelpDocumentation/>} />
          
          </Route> 
          <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
