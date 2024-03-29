var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport");
const jwt = require("jsonwebtoken");
const { UserModel } = require('./models/user.model');
require("dotenv").config();

// Configure passport to use Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    // Check if user already exists in the database
    let euser=await UserModel.findOne({email:profile.emails[0].value});
    if(euser){
      // If user exists, generate a JWT token and add it to the profile object
      let token=jwt.sign({"_id":euser._id},process.env.secret);
      profile["t"]=token;
    }else{
      // If user does not exist, create a new user in the database with email and given name, then generate a JWT token and add it to the profile object
      let nuser= new UserModel({email:profile.emails[0].value,name:profile.name.givenName})
      await nuser.save();
      euser=await UserModel.findOne({email:profile.emails[0].value});
      let token=jwt.sign({"_id":euser._id},process.env.secret);
      profile["t"]=token;
    }
    
    // Export the profile object
    module.exports={
      profile
    }
     function User(err, user) {
      return cb(err, user);
    }
    User()
    
  }
));
  
// Export the passport object for use in other modules
module.exports={passport}