const express = require("express");
const { check } = require("express-validator");
const rc = require("./register.controller");

const router = express.Router();

router.get("/signup", rc.signupPage);
router.get("/login", rc.loginPage);

router.post("/signup", rc.signup);
router.post("/login", rc.login);
router.post("/logout", rc.logout);

module.exports = router;