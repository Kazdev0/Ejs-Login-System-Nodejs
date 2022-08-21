const mongoose = require("mongoose");
var Schema = mongoose.Schema

const UserSchema = new Schema({
    discordId:{
        type:String,
        required:false
    },
    username: {
        type:String,
        required:true
    },
    discriminator:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true
    }
    
})
const User = mongoose.model("User", UserSchema)
module.exports = User;