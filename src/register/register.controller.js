const jwt = require("jsonwebtoken");
const { validationResult} = require("express-validator");
const userModel = require("./register.model");

exports.auth = (req, res, next) => {
    if(req.session.loggedin) {
        next();
    } else {
        res.redirect("/login");
    }
}

// pages
exports.loginPage = (req, res) => {res.render("./login");}
exports.signupPage = (req, res) => {res.render("./signup");}



// post methods
exports.signup = async (req, res) => {
    try {
        const user = new userModel(req.body);
        await user.save();

        req.session.loggedin = true;
        req.session.username = user.username;

        console.log("Success, signed up as " + user.username);
        res.redirect('/');

    } catch (error) {
        res.render('/signup', {
            error_msg: "Something went wrong when signing up..."
        });
    }

    // To-Do: check if user already exists, valid credentials, etc
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({username});

        if(!user) {
            return res.render('./login', {
                error_msg: "User does not exist."
            });
        }

        if(!(password == user.password)) {
            return res.render('./login', {
                error_msg: "Password does not match."
            });
        }

        req.session.loggedin = true;
        req.session.username = user.username;

        console.log("Success, logged in as " + user.username);
        res.redirect('/');

    } catch (error) {
        res.render('./login', {
            error_msg: "Something went wrong when logging in..."
        });
    }
}

exports.logout = async (req, res) => {
    req.session.loggedin = false;
    req.session.username = "";

    res.redirect('/login');
}