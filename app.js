const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
require("dotenv").config();
const app = express();
const port = 5000;

const { ensureAuth, ensureAuthenticated } = require("./authentication/check");
const userRouter = require("./routes/users");
// DataBase
const User = require("./models/User");

mongoose.connect("mongodb://localhost/login", {
    useNewUrlParser:true
});
const db = mongoose.connection;
db.on("error",console.error.bind(console, "Connection Error"));
db.once("open", () => {
    console.log("Connection to Database");
});
// Flash Middleware
app.use(cookieParser("passport"));

// global res.locals middlewares



app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));
app.use(flash());
//Passport ınitialize
app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success');
    res.locals.error_msg = req.flash('error');
    res.locals.error = req.flash('error');
    res.locals.login_error_msg = req.flash('login_error_msg');
    res.locals.user = req.user;
    next();
  });

// Template Engine Middleware
app.set("view engine", "ejs");
// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended:false }));
// Router Middleware
app.use(userRouter);


app.get("/", ensureAuthenticated ,(req, res, next) => {
    User.find({}).then((users) =>{
        res.render("pages/index", {users});
    })
});
app.use((req, res) => {
    res.send("404 Not Found.")
});
app.listen(port, () => {
    console.log("App Started")
});