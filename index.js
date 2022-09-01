// Importing our packages
const express = require("express");
const server = express();
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");
const connectDB = require("./config/db.js");
const pet_router = require("./routes/routes.pet");
const user_router = require("./routes/routes.user");

//Connecting to database
const port = process.env.PORT || 7895;
connectDB();

//middleware
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.get('/', (req, res) => res.send('WELCOME TO BIGGIEVET: where your pets get the best care... 🐕🐈🐏🐄🐖🐐'));
server.use("/api/pet", pet_router);
server.use("/api/user", user_router);



//Listening to server
server.listen(port, () => {
  console.log(`Server up and running on port http://localhost:${port}`);
});
