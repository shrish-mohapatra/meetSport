const express = require('express');
const router = express.Router();
const controller = require("./chat.controller");

router.get('/chat', controller.roomPage)
router.get('/createchat/:room/:username', controller.chatPage)

router.get('/createchat/:friendName', controller.createRoom)

module.exports = router;