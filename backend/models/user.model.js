const { default: mongoose } = require("mongoose");

// Schema for User
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

// Model for User
const UserModel=mongoose.model('user',userSchema);

module.exports={
    UserModel
}