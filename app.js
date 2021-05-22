const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/form', { useNewUrlParser: true, useUnifiedTopology: true });
const port = 80;
const bodyparser = require("body-parser")

// Define mongoose schema

const formSchema = new mongoose.Schema({
    name: String,
    pno: String,
    address: String,
    email: String,
    concern: String,
});

const form = mongoose.model('form', formSchema);

app.use(express.urlencoded());
app.use("/static", express.static('static'));
app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))
app.get("/", (req, res) => {
    res.status(200).render("index.pug")
})
app.get("/contact", (req, res) => {
    res.status(200).render("contact.pug")
})

app.post("/contact", (req, res) => {
    var myData = new form(req.body);
    myData.save().then(() => {
        res.send('This item has been saved to the database')
    }).catch(() => {
        res.status(400).send('item was not saved to the databse')
    })
})

app.listen(port, () => {
    console.log(`The server has started at port ${port}`)
})