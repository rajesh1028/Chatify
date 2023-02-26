const express = require("express");
const { StatusModel } = require("../models/status.model");

const statusRoute = express.Router();

statusRoute.get("/", async (req, res) => {
    try {
        const status = await StatusModel.find();
        res.send(status);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

statusRoute.post("/add", async (req, res) => {
    const { name, image, description, views } = req.body;
    try {
        const status = new StatusModel({ name, image, description, views });
        await status.save();
        res.send("ok");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

statusRoute.patch("/update/:id", async (req, res) => {
    const { name, image, description, views } = req.body;
    const id = req.params.id;
    try {
        await StatusModel.findByIdAndUpdate(id, { name, image, description, views });
        res.send("Status updated successfully");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

statusRoute.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await StatusModel.findByIdAndDelete(id);
        res.send("Status deleted successfully");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

module.exports = {
    statusRoute
}
