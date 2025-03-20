import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";
import signOutIcon from "../../../assets/img/signout.png";

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
    <div className="login-container">
      {isLoggedIn ? (
        <button className="login-button" onClick={handleLogout}>
          <img src={signOutIcon} alt="Sign Out" className="signout-icon" />
        </button>
      ) : (
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          render={({ onClick, disabled }) => (
            <button
              className="login-button"
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