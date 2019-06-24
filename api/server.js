const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("../routers/user.js");
const countryRouter = require("../routers/country.js");
const session = require('express-session');

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));

// configure express-session middleware
server.use(
  session({
    name: 'notsession', // default is connect.sid
    secret: 'nobody tosses a dwarf!',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: true, // only set cookies over https. Server will not send back a cookie over http.
    }, // 1 day in milliseconds
    httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
    resave: false,
    saveUninitialized: false,
  })
);


server.use("/user", userRouter);
server.use("/api",countryRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "Server is up" });
});

module.exports = server;
