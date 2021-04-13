import React from "react";
import config from "./config";
import io from "socket.io-client";
import BottomBar from "./BottomBar";
import "./style/chat.css";
import { withAuth0 } from "@auth0/auth0-react";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: [],
      content: "",
      name: "",
    };
  }

  componentDidMount() {
    this.socket = io(config[process.env.NODE_ENV].endpoint);

    // Push message to chat.
    this.socket.on("push", (message) => {
      this.setState(
        (state) => ({
          chat: [...state.chat, message],
        }),
        this.scrollToBottom
      );
    });
  }

  // Save the message the user is typing in the input field.
  handleContent(event) {
    this.setState({
      content: event.target.value,
    });
  }

  handleSubmit(event) {
    const { user } = this.props.auth0;
    var usernameFull = JSON.stringify(
      user["https://jameschatapp.herokuapp.com/username"]
    );
    var username = usernameFull.substring(1, usernameFull.length - 1);

    // Prevent the form from reloading the current page.
    event.preventDefault();

    // Send the new message to the server.
    this.socket.emit("message", {
      name: username,
      content: this.state.content,
    });

    this.setState((state) => {
    // Update the chat with the user's message and remove the current message
      return {
        chat: [
          ...state.chat,
          {
            name: username,
            content: state.content,
          },
        ],
        content: "",
      };
    }, this.scrollToBottom);
  }

  // Automatically scrolls to most recent message.
  scrollToBottom() {
    const chat = document.getElementById("chat");
    chat.scrollTop = chat.scrollHeight;
  }

  render() {
    return (
      <div class="App">
        <div id="chat">
          {this.state.chat.map((el, index) => {
            return (
              <div key={index}>
                <div variant="caption" class="name">
                  {el.name}
                </div>
                <div variant="body" class="content">
                  {el.content}
                </div>
              </div>
            );
          })}
        </div>
        <BottomBar
          content={this.state.content}
          handleContent={this.handleContent.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default withAuth0(Chat);
