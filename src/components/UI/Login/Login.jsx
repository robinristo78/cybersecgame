import React from "react";
import "./Login.css";
import { GoogleLogin } from "@react-oauth/google";

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleSuccess = (response) => {
    console.log("Google Login Success:", response);

    // Save clientId and login status to localStorage
    localStorage.setItem("clientId", response.clientId);
    localStorage.setItem("isLoggedIn", "true");

    // Update login state
    setIsLoggedIn(true);

    alert("Login successful!");
  };

const handleLogout = () => {
    // Clear login status and clientId from localStorage
    localStorage.removeItem("clientId");
    localStorage.setItem("isLoggedIn", "false");

   // Update login state
   setIsLoggedIn(false);

   alert("Logged out successfully!");
 };

  const handleError = () => {
    console.error("Google Login Failed");
  };

  return (
    <div>
      {isLoggedIn ? (
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      ) : (
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.error("Google Login Failed")}
          render={({ onClick, disabled }) => (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={onClick}
              disabled={disabled}
            >
              Sign In
            </button>
          )}
        />
      )}
    </div>
  );
};

export default Login;