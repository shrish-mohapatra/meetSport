const express = require('express');
const router = express.Router();
const cc = require("./chat.controller");

router.get('/chat', cc.roomPage)
router.get('/:room', cc.chatPage)

//on create room event, posted to /room
router.post('/room', cc.createRoom)

// server.listen(3000)

module.exports = router;