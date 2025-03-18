import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const handleSuccess = (response) => {
    console.log("Google Login Success:", response);
  };

  const handleError = () => {
    console.error("Google Login Failed");
  };

  return (
    <div className="w-80 h-32 relative bg-white rounded-[20px] shadow-md">
      <div className="w-80 h-32 absolute bg-blue-600 rounded-[20px] border-4 border-yellow-400"></div>

      <div className="absolute left-[50%] top-[20%] transform -translate-x-1/2 text-white text-3xl font-extrabold">
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>
    </div>
  );
};

export default Login;
