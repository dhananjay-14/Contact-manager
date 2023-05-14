const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type:String,
        required:[true,"Please enter an username"], 
    },
    email:{
        type : String,
        require:[true,'Please add the contact email '],
        unique:[true,"Email address is already taken"],
    },
    password:{
        type: String,
        require:[true,"Please enter your password"],
    },
},{
    timestamps:true,
});
module.exports= mongoose.model("User",userSchema);