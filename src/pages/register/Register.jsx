import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { registerUserApi } from "../../apis/Apis";
import { User, Mail, Phone, Lock, UserCircle } from "lucide-react";
import registerui from "../../assets/images/register_image.jpg";

function Register() {
  const [userName, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateForm = () => {
    let isValid = true;
    if (!userName.trim()) {
      setUsernameError("Username is required");
      isValid = false;
    } else {
      setUsernameError("");
    }
    if (!phoneNumber.trim()) {
      setPhoneNumberError("Number is required");
      isValid = false;
    } else {
      setPhoneNumberError("");
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Confirm Password is required");
      isValid = false;
    } else if (password.trim() !== confirmPassword.trim()) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = {
      userName: userName,

      phoneNumber: phoneNumber,
      password: password,
    };

    registerUserApi(data)
      .then((res) => {
        if (res.data.sucess === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Registration failed. Please try again.");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Toaster />
      <div className="bg-blue-100 rounded-lg shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Register</h2>
          <p className="text-gray-600 mb-4">
            Please fill in the details to create an account
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="h-14 relative">
              <div className="relative">
                <div className="absolute inset-y-0 right-3 pl-3 flex items-center pointer-events-none">
                  <UserCircle className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {usernameError && (
                <p className="text-red-500 text-xs absolute -bottom-0">
                  {usernameError}
                </p>
              )}
            </div>

            <div className="h-14 relative">
              <div className="relative">
                <div className="absolute inset-y-0 right-3 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              {phoneNumberError && (
                <p className="text-red-500 text-xs absolute -bottom-0">
                  {phoneNumberError}
                </p>
              )}
            </div>

            <div className="h-14 relative">
              <div className="relative">
                <div className="absolute inset-y-0 right-3 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs absolute -bottom-0">
                  {passwordError}
                </p>
              )}
            </div>

            <div className="h-14 relative">
              <div className="relative">
                <div className="absolute inset-y-0 right-3 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  type="password"
                  name="confirm-password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {confirmPasswordError && (
                <p className="text-red-500 text-xs absolute -bottom-0">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition duration-300 mt-6"
            >
              Register
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden md:block w-1/2">
          <img
            src={registerui}
            alt="Register"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
