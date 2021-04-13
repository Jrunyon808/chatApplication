import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./style/loginButton.css";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className="loginButtonStyle" onClick={() => loginWithRedirect()}>
      Click here to enter
    </button>
  );
};

export default LoginButton;
