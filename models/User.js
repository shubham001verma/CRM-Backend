const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
       
        trim: true
    },
    lastName: {
        type: String,
       
        trim: true
    },
    compenyName:{
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
       
    },
    address:{
        type: String,
        trim: true
    },
    phone:{
        type: String,
        trim: true
    },
    image:{
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role:{
        type: String,
        default: 'Admin'
    },
    profileName:{
        type: String,
        default: null
    }
});


module.exports = mongoose.model("User", userSchema);
