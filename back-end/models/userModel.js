const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name field cannot be empty"]
    },
    email:{
        type: String,
        required: [true, "Email field cannot be empty"]
    },
    password:{
        type: String,
        required: [true, "Password field cannot be empty"]
    },
},
    {
        timestamps:true
    }
);

module.exports = mongoose.model("User",userSchema);