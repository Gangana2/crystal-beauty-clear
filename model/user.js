import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, //email eka innama ona 
        unique: true //email eka duplicate wenna epa
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "user" //role eka fill nokaroth default agayak wetenna haduwa
    }
})