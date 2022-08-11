var bcrypt = require('bcryptjs');
const User = require("../models/User");
module.exports.getUserLogin =  (req, res) => {
    res.render("pages/login")
}
module.exports.getUserRegister =  (req, res) => {
    res.render("pages/register",{
        username:"",
        password:"",
        errors:[]
    })
}
module.exports.postUserLogin = (req, res) => {
    res.send("login");
}
module.exports.postUserRegister = (req, res) => {
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
                    if(err) throw err;
                    const newUser = new User({
                        username:username,
                        password: hash
                    });
                    newUser.save();
                });
            });

            return res.render("pages/register",{
                errors,
                username,
                password
            })   
        }
    }).catch(err => console.log(err))
    /**/
    }