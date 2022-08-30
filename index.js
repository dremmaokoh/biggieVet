// Importing our packages
const express = require('express');
const server = express();
const morgan = require('morgan');
require('dotenv').config();


const router = require('./routes/user.routes');
const connectDB = require('./database/db');

//Connecting to database 
connectDB()

//middleware
server.use(morgan('dev'));
server.use(express.json());
server.use ('/api', router);

const port = process.env.PORT || 7895;
 
//Listening to server
server.listen(port, () => {
    console.log(`Server up and running on port http://localhost:${port}`);
  });
