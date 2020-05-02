// installed modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("config");
const path = require("path");

// app routes
const register_route = require("./src/register/register.route");

const port = config.get("app.port");
const app = express();

app.set("views", path.join(__dirname, "src/views"));
app.set('view engine', 'ejs');
app.use(register_route);

// MongoDB connection
mongoose.connect(config.get("database.url"), {
    useUnifiedTopology: true,
    useNewUrlParser: true})
    .then(() => console.log("Connected to mongoDB"))
    .catch(err => console.error(err))

app.listen(port, (req, res) => {
    console.log("Running server on localhost:" + port);
})
