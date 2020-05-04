const express = require("express");
const { check } = require("express-validator");
const controller = require("./register.controller");

const router = express.Router();

router.get("/signup", controller.signupPage);
router.get("/login", controller.loginPage);

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.post("/logout", controller.logout);

module.exports = router;