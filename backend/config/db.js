const mongoose = require("mongoose");
require("dotenv").config();

// Connecting To the MongoDB present on MongoDB Atlas
const connection=mongoose.connect(process.env.mongoURL);

module.exports={
    connection
}