var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport");
const { UserModel } = require('./models/user.model');
require("dotenv").config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile);
    let Gname=profile.given_name;
    let email=profile.email;
    // let user = await UserModel.findOne({ email });
    // if(user){

    // }
    module.exports={
      Gname
    }
     function User(err, user) {
      return cb(err, user);
    }
    User()
    
  }
));

module.exports={passport}