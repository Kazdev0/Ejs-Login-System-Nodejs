const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const app = express();
const port = 5000;


const userRouter = require("./routes/users")
mongoose.connect("mongodb+srv://user:rcon@cluster0.5fqws.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser:true
})
const db = mongoose.connection;
db.on("error",console.error.bind(console, "Connection Error"))
db.once("open", () => {
    console.log("Connection to Database");
});
// Template Engine Middleware
app.set("view engine", "ejs")
// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended:false }))
// Router Middleware
app.use(userRouter)


app.get("/", (req, res, next) => {
    res.render("pages/index")
})
app.use((req, res) => {
    res.send("404 Not Found.")
})
app.listen(port, () => {
    console.log("App Started")
})