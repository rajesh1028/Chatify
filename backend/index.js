const express = require("express");
const cors = require("cors");

const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRouter");
const { passport, Gname } = require("./google-auth");

const app = express();
app.use(cors());

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

app.get('/re', (ask, give) => {
    console.log(Gname)
    give.redirect(301, `http://127.0.0.1:5500/frontend/chatify.html/`);
})

app.listen(process.env.port, () => {
    try {
        connection
        console.log(`Connected to the DB and server is running at ${process.env.port}`)
    } catch (error) {
        console.log(error);
        console.log("Error in connecting to the DB")
    }
})