const express = require("express");
const router = express.Router();
const controller = require('./core.controller');
const auth = require('../register/register.controller').auth;

//router.get('/getUsers' , controller.getUsers);
//router.get('/testC' , controller.testCreate);
router.get("/", auth, controller.homePage);
router.get('/testing', controller.testCreate)
router.post('/addFriend/:friendName', controller.addFriend)

router.post("/editProfile" , controller.editProfile);



module.exports = router;






