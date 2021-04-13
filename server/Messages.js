const mongoose = require("mongoose");

//Defines schema for messages sent between users.
const messageSchema = new mongoose.Schema(
  {
    content: String,
    name: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
