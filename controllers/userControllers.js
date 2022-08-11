var bcrypt = require('bcryptjs');
const {formValidation} = require("../validation/formValidation")
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
      res.render('pages/register', {
        errors,
        username,
        password
        
      });
    }

    }