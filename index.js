// Importing our packages
const express = require("express");
const server = express();
//const http = require('http');
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");
const connectDB = require("./config/db.js");

const pet_router = require("./routes/routes.pet");
const user_router = require("./routes/routes.user");

//Connecting to database
connectDB();

//middleware
server.use(morgan("dev"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "static/index.html"));
});

server.use("/api/pet", pet_router);
server.use("/api/user", user_router);

const port = process.env.PORT || 7895;

//Listening to server
server.listen(port, () => {
  console.log(`Server up and running on port http://localhost:${port}`);
});
