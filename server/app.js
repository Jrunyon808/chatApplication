var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var app = express();
var dotenv = require("dotenv");
const Message = require("./Messages");
dotenv.config();
var socketApi = require("./socketApi");
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(cors());
require("dotenv").config();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "client", "build")));
const uri = process.env.ATLAS_URI;

//Connect to mongoose.
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connected successfully");
});

app.use("/", indexRouter);

// Catch 404 and forward to error handler.
app.use(function (req, res, next) {
  next(createError(404));
});

// Handle errors.
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

io.on("connection", (socket) => {
  // Handle messages.
  socket.on("message", (msg) => {
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

module.exports = { app, socketApi };
