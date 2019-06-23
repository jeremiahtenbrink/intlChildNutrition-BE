const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("../routers/user.js");
const countryRouter = require("../routers/country.js")

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));


server.use("/user", userRouter);
server.use("/api",countryRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "Server is up" });
});

module.exports = server;
