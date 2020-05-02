const express = require('express');
const router = require("./routes");

const app = express();

app.set('view engine', 'ejs');
app.use(router);

app.listen(8000, (req,res) =>  {
    console.log("Running server on http://127.0.0.1:8000/");
})