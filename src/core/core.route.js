const express = require("express");
const router = express.Router();
const controller = require('./core.controller');
const auth = require('../register/register.controller').auth;

router.get("/", auth, controller.homePage);
router.get('/testing', controller.testCreate);
router.get('/addFriend/:friendName', controller.addFriend);

router.post("/editProfile", controller.editProfile);

module.exports = router;