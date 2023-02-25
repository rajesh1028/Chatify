const { url } = require("inspector");
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name: String,
    image:String,
    description: String,
    views: Number
})

const StatusModel = mongoose.model("status", userSchema);

module.exports = {
    StatusModel
}