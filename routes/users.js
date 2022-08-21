const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../authentication/passport/discord");
const {getUserLogin, postUserLogin, getUserRegister, postUserRegister, getUserLogout} = require("../controllers/userControllers")

router.get("/login",getUserLogin);

router.get("/logout", getUserLogout)

router.get("/register",getUserRegister)

router.post("/login",postUserLogin);

router.post("/register",postUserRegister)

router.get("/discord/login", passport.authenticate("discord"));
router.get('/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/login'
}), function(req, res) {
    res.redirect('/') // Successful auth
});

  

module.exports = router;