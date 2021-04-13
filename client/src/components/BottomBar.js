import React from "react";
import "./style/bottomBar.css";
import SubmitIcon from "./SubmitIcon";

export default function BottomBar(props) {
  return (
    <div position="fixed" class="appBar">
      <div class="inputContainer">
        <form onSubmit={props.handleSubmit}>
          <input
            onChange={props.handleContent}
            value={props.content}
            placeholder="Enter your message..."
            inputProps={{ "aria-label": "content" }}
          />
          <button id="submitButton" onClick={props.handleSubmit}>
            {" "}
            <SubmitIcon submitIcon="submitIcon" />
          </button>
        </form>
      </div>
    </div>
  );
}
