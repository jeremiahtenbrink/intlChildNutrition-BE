const express = require("express");
const server = express();
const userRouter = require("../routers/user.js");
const countryRouter = require("../routers/country.js")

server.use(express.json());
server.use("/user", userRouter);
server.use("/api",countryRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "Server is up" });
});

module.exports = server;
