const express = require("express");
const cors = require("cors");

const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRouter");
const { passport } = require("./google-auth");

const app = express();
app.use(cors());
app.use(express.json())

    app.get('/re', (ask, give) => {
        let {profile}=require("./google-auth")
        give.redirect(`http://127.0.0.1:5500/frontend/chatify.html?token=${profile.t}&name=${profile.name.givenName}&hfh=${profile.t}`);
    })

app.get('/', (ask, give) => {
    give.send('Welcome to Chatify.com Backend')
})

app.use('/user', userRouter);

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/re' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });



app.listen(process.env.port, () => {
    try {
        connection
        console.log(`Connected to the DB and server is running at ${process.env.port}`)
    } catch (error) {
        console.log(error);
        console.log("Error in connecting to the DB")
    }
})