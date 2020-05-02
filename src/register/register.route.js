const express = require("express");
const registerController = require("./register.controller");

const router = express.Router();

router.get("/", registerController.loginPage);

router.post("/user", registerController.create);
router.get("/users", registerController.findAll);
router.get("/user/:id", registerController.find);

module.exports = router;