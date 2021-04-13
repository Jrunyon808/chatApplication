import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./style/logoutButton.css";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className="logoutButtonStyle" onClick={() => logout()}>
      Log Out
    </button>
  );
};

export default LogoutButton;
