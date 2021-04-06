// implement your server here
// require your posts router and connect it here
const postsRouter = require("./posts/posts-router");
const express = require("express");
const server = express();

server.use("/api/posts", postsRouter);

server.use(express.json());

module.exports = server;
