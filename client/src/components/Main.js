import React from "react";
import "./style/main.css";
import "./style/bottomBar.css";
import "./style/loginPage.css";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import Chat from "./Chat";

const Main = () => {
  // Retrieve access to functions from auth0.
  const { isAuthenticated, isLoading, user } = useAuth0();

  // Wait to display elements on page until fully loaded.
  if (isLoading) {
    return null;
  }
  // If user is authenticated return chat page, otherwise return splash page that redirects to login page.
  if (isAuthenticated === false) {
    return (
      <div className="container">
        <div className="pulse"></div>
        <div className="slider-wrapper">
          <div className="slider">
            <div className="slider-text1">
              <LoginButton />
            </div>
            <div className="slider-text2">Made With React + Express</div>
            <div className="slider-text3">Online Chat Application</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container2">
        <h1 className="header2">
          Logged in as: {user["https://jameschatapp.herokuapp.com/username"]}
        </h1>
        <div className="logoutButton">
          <LogoutButton />
        </div>
        <div className="chat">
          <Chat />
        </div>
      </div>
    );
  }
};

export default Main;
