const registerModel = require("./register.model");

exports.loginPage = (req, res, next) => {
    res.render("./login");
}

exports.create = (req, res, next) => {
    console.log("Create new account");
};

exports.findAll = (req, res, next) => {
    console.log("Finding all accounts");
};

exports.find = (req, res, next) => {
    console.log("Finding specified account");
};