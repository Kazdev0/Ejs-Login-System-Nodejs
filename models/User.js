const mongoose = require("mongoose");
var Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    },
    Date:Date.now       
})

const User = mongoose.model("User", UserSchema)
module.exports = User;