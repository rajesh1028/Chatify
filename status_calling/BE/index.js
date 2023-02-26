const express = require("express");
const { connection } = require("./configs/db");
const { statusRoute } = require("./routes/status.Route");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home Page...")
})

app.use("/status", statusRoute);



app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("connected to DB");
    } catch (error) {
        console.log(error);
    }
    console.log("server is listening at port " + process.env.port);
})