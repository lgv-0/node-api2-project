const express = require("express");
const server = express();
server.use(express.json());

//
const BlogRouter = require("../blog/blog-router.js");
server.use("/blog", BlogRouter);
//

server.get("/", (req, res) =>
{
  res.status(200).json({"status":"we're online (barely)"});
});

module.exports = server;