var bcrypt = require('bcryptjs');
const User = require("../models/User");
const passport = require("passport");
require("../authentication/passport/local");



module.exports.getUserLogin =  (req, res) => {
    // Login Page
    res.render("pages/login")
}
module.exports.getUserLogout = (req, res) => {
    // Clear Cookies
    res.clearCookie("connection.sid");
    res.redirect("/login")
}
module.exports.getUserRegister =  (req, res) => {
    // Register Page
    res.render("pages/register",{
        username:"",
        password:"",
        errors:[]
    })
}
module.exports.postUserLogin = (req, res, next) => {
    // req.flash("error")
    // res.flash("success")
passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect:"/login",
  failureFlash:true,
  successFlash:true
})(req,res,next);

}
module.exports.postUserRegister = (req, res, next) => {
    const { username, password } = req.body;
    let errors = [];
  
    if (!username || !password) {
      errors.push({ message: 'Please enter all fields' });
    }
  
  
    if (password.length < 6) {
      errors.push({ message: 'Password must be at least 6 characters' });
    }
  
    if (errors.length > 0) {
      return res.render('pages/register', {
        errors,
        username,
        password
        
      });
    }
    User.findOne({username}).then(user => {
        if(user){
            errors.push({message:"Username Already In Use."});
            return res.render('pages/register', {
                errors,
                username,
                password
                
              })
        } else {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    // Store hash in your password DB.
                    const newUser = new User({
                        username:username,
                        password: hash
                    });
                    newUser.save().then((user) => {
                        req.flash("success_msg", "You are now registered and can log in")
                        return res.redirect("/")
                    })
                });
            });
        }
    }).catch(err => console.log(err))
    /**/
    }