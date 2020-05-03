// installed modules
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const path = require("path");
const session = require("express-session");

// app routes
const register_route = require("./src/register/register.route");
const chat_route = require("./src/chat/chat.route");
const core_route = require("./src/core/core.route");

const port = config.get("app.port");
const app = express();

// MongoDB connection
mongoose.connect(config.get("database.uri"), {
    useUnifiedTopology: true,
    useNewUrlParser: true})
    .then(() => console.log("Connected to mongoDB"))
    .catch(err => console.error(err))

app.set("views", path.join(__dirname, "src/views"));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static('src/chat')) //folder for js and css

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(register_route);
app.use(chat_route);
app.use(core_route);


app.listen(port, (req, res) => {
    console.log("Running server on localhost:" + port);
})
