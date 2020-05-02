const express = require('express');
const router = require('./routes');
const app = express();
const members = require('./utilities/members');

app.set('view engine', 'ejs');

const PORT = 8000;

app.use(router);

//Get All users
app.get('/api/members', (req, res) => res.json(members))

app.listen(PORT, (req, res)=> {
    console.log("Running server on port:" + parseInt(PORT));
});

