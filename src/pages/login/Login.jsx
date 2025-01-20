import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import loginui from "../../assets/images/register_image.jpg";
import "./Login.css";
import { Toaster, toast } from "react-hot-toast";
import {
  googleLoginApi,
  loginUserApi,
  getUserByGoogleEmail,
} from "../../apis/Apis";
import { EyeOff, Eye, Mail, Lock, Phone } from "lucide-react";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [googleToken, setGoogleToken] = useState("");
  const [googleId, setGoogleId] = useState("");
  const [role, setRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validation = () => {
    let isValid = true;

    // Phone Number Validation
    if (phoneNumber.trim() === "") {
      setPhoneError("Phone Number is empty");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is empty");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    const data = {
      phoneNumber: phoneNumber,
      password: password,
    };

    loginUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.token);
          const convertedData = JSON.stringify(res.data.userData);
          localStorage.setItem("user", convertedData);
          window.location.href = res.data.userData.isAdmin
            ? "/admin"
            : "/homepage";
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
          toast.error("Login failed. Please try again.");
        }
      });
  };

  const handleGoogleLogin = () => {
    googleLoginApi({ token: googleToken, googleId, role, password })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Login Successful");
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          window.location.href = "/homepage";
        } else {
          console.error("Failed to send token to backend");
        }
      })
      .catch((error) =>
        console.error("Error sending token to backend:", error)
      );
  };

  return (
    <div className="login-container bg-blue-500">
      <Toaster />
      <div className="login-box">
        <div className="login-form">
          <h2 className="login-title">Login</h2>
          <p className="login-subtitle">Please Login to Continue</p>
          <form onSubmit={handleLogin} className="login-fields">
            <div className="input-container">
              <div className="relative">
                <input
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="login-input"
                  type="number"
                  name="phoneNumber"
                  value={phoneNumber}
                  placeholder="Phone Number"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Phone className="text-gray-400" size={20} />
                </div>
              </div>
              {phoneError && (
                <p className="login-error-message">{phoneError}</p>
              )}
            </div>

            <div className="input-container">
              <div className="relative">
                <input
                  className="login-input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="text-gray-400" size={20} />
                  ) : (
                    <Eye className="text-gray-400" size={20} />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="login-error-message">{passwordError}</p>
              )}
              <div className="flex justify-end mt-2">
                <Link
                  to="/forgetpassword"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          
          <div className="google-login">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const token = credentialResponse.credential;
                const details = jwtDecode(token);
                setGoogleId(details.sub);
                setGoogleToken(token);

                getUserByGoogleEmail({ token })
                  .then((response) => {
                    if (response.status === 200) {
                      handleGoogleLogin({ token });
                    } else if (response.status === 201) {
                      setShowModal(true);
                    }
                  })
                  .catch((error) => {
                    if (error.response && error.response.status === 400) {
                      toast.warning(error.response.data.message);
                    } else {
                      toast.error("Error: Something went wrong");
                    }
                  });
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
          
          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
        
        <div className="login-image">
          <img src={loginui} alt="Login" />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-8">
            <h2 className="mb-4 text-2xl font-bold">
              Complete Your Registration
            </h2>

            <div className="input-container">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Set a password"
                  className="login-input"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="text-gray-400" size={20} />
                  ) : (
                    <Eye className="text-gray-400" size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleGoogleLogin}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
              >
                Complete Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

