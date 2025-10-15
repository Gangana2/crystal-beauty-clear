import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    //validation eka hadanna puluwan mehema
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
    },
    contact: {
        type: String,
        required: true,
        default: "0000000000"
    },
    password: {
        type: String,
        required: true
    },
    isDisabled: {
        type: Boolean,
        required: true,
        default: false
    }
})

const User = mongoose.model("users", userSchema); //users kiyana collection ekata me schema eka apply karanawa
export default User;