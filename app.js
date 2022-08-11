const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const port = 5000;


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
app.use(session({ cookie: { maxAge: 60000,resave: true, secret:"passport",saveUnitialized: true }}));
app.use(flash());

// Template Engine Middleware
app.set("view engine", "ejs");
// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended:false }));
// Router Middleware
app.use(userRouter);


app.get("/", (req, res, next) => {
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