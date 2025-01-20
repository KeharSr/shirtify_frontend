import React, { useState, useEffect } from "react";
import applogo from "../../src/assets/images/logo1.png";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { getCurrentUserApi } from "../apis/Apis";

import LogoutDialog from "./LogoutDialog";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const location = useLocation();

  useEffect(() => {
    getCurrentUserApi()
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed w-full z-40 bg-white shadow-sm"
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img className="h-12 w-auto mr-2" src={applogo} alt="Shirtify Logo" />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <NavLink to="/homepage" active={location.pathname === "/homepage"}>Home</NavLink>
              <NavLink to="/longsleeves" active={location.pathname === "/longsleeves"}>Long Sleeves</NavLink>
              <NavLink to="/shortsleeves" active={location.pathname === "/shortsleeves"}>Short Sleeves</NavLink>
              <NavLink to="/myorder" active={location.pathname === "/myorder"}>My Orders</NavLink>
              <NavLink to="/favourites" active={location.pathname === "/favourites"}>Favourites</NavLink>
              <NavLink to="/help" active={location.pathname === "/help"}>Help</NavLink>
              
              <Link to="/addtocart" className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                <ShoppingCart className="w-5 h-5" />
              </Link>

              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center focus:outline-none"
                >
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-800 font-medium text-sm ml-1">
                    {user ? user.firstName : "Guest"}
                  </span>
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.1 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                    >
                      Edit Profile
                    </Link>
                    <button
                      onClick={() => setShowLogoutDialog(true)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="px-2 pt-2 pb-2 space-y-1 sm:px-3">
              <NavLink to="/homepage" mobile active={location.pathname === "/homepage"}>Home</NavLink>
              <NavLink to="/longsleeves" mobile active={location.pathname === "/longsleeves"}>Long Sleeves</NavLink>
              <NavLink to="/shortsleeves" mobile active={location.pathname === "/shortsleeves"}>Short Sleeves</NavLink>
              <NavLink to="/myorder" mobile active={location.pathname === "/myorder"}>My Orders</NavLink>
              <NavLink to="/favourites" mobile active={location.pathname === "/favourites"}>Favourites</NavLink>
              <NavLink to="/addtocart" mobile active={location.pathname === "/addtocart"}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
              </NavLink>
              <button
                onClick={() => setShowLogoutDialog(true)}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </motion.nav>

      <LogoutDialog 
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={() => {
          handleLogout();
          setShowLogoutDialog(false);
        }}
      />
    </>
  );
};

const NavLink = ({ to, children, mobile, active }) => (
  <Link
    to={to}
    className={`${
      mobile
        ? `block px-3 py-2 rounded-md text-sm font-medium ${
            active 
              ? "text-purple-600 bg-purple-50"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          }`
        : `text-gray-600 hover:text-gray-800 px-2 py-1 rounded-md text-sm font-medium transition-colors duration-200 relative group ${
            active ? "text-purple-600" : ""
          }`
    }`}
  >
    {children}
    {!mobile && (
      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transform transition-transform duration-200 ${
        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      }`}></span>
    )}
  </Link>
);

export default Navbar;