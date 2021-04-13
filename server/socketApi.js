var socket_io = require("socket.io");
var io = socket_io();
const Message = require("./Messages");

const socketApi = {
  io: io,
};

io.on("connection", (socket) => {
  // Listen to connected users for a new message.
  socket.on("message", (msg) => {
    // Create a message with the content and the name of the user.
    const message = new Message({
      content: msg.content,
      name: msg.name,
    });

    // Save the message to the database.
    message.save((err) => {
      if (err) return console.error(err);
    });

    // Notify all other users about a new message.
    socket.broadcast.emit("push", msg);
  });
});

module.exports = socketApi;
