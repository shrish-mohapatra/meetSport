const express = require("express");
const router = express.Router();
const controller = require('./core.controller');

router.get('/dashboard' , controller.dashboard);
router.get('/match' , controller.match);
//router.get('/testC' , controller.testCreate);





module.exports = router;






