const express = require("express");
const cors = require("cors");

const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRouter");
const { passport } = require("./google-auth");

// Create an Express application
const app = express();
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
// Response and Payload is done in Json Format
app.use(express.json())

// Route for redirecting the User To Our Homepage after Google OAuth authentication
    app.get('/re', (ask, give) => {
        let {profile}=require("./google-auth")
        give.redirect(`https://chatify-com.netlify.app/status_calling/fe/?token=${profile.t}&name=${profile.name.givenName}&hfh=${profile.t}`);
    })

// Route for the home page
app.get('/', (ask, give) => {
    give.send('Welcome to Chatify.com Backend')
})

// Used The userRouter Here
app.use('/user', userRouter);


// Route that redirects the user to Sign in with Google Page
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile','email'] }));

// After Siging In with Google, google Oauth redirects to this route 
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/re' }),
    function (req, res) {
        res.redirect('/');
    });


// Starting the Express Server and Connecting to the MongoDB
app.listen(process.env.port, () => {
    try {
        connection
        console.log(`Connected to the DB and server is running at ${process.env.port}`)
    } catch (error) {
        console.log(error);
        console.log("Error in connecting to the DB")
    }
})