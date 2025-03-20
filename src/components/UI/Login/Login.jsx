import React from "react";
import "./Login.css";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const handleSuccess = (response) => {
    console.log("Google Login Success:", response);
  };

  const handleError = () => {
    console.error("Google Login Failed");
  };

  return (
    <>
      <div className="Gradient">
        <div className="Login_box">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            render={({ onClick, disabled }) => (
              <img
                src={googleLogo} // Use the imported image
                alt="Login with Google"
                onClick={onClick}
                disabled={disabled}
                style={{ cursor: "pointer" }} // Make it look clickable
              />
            )}
          />
        </div>
      </div>
    </>
  );
};

export default Login;