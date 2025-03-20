import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "YOUR_GOOGLE_CLIENT_ID";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="181335811311-g5mtr8fjst4gai0ctisgci8mn9js44j8.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);