import mongoose from "mongoose"; 
const userSchema = new mongoose.Schema({ //user schema eka hadanna
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
        required: true //last name eka innama ona
    },
    role: {
        type: String,
        required: true,
        default: "user" //role eka fill nokaroth default agayak wetenna haduwa
    },
    contact: {
        type: String,
        required: true,
        default: "0000000000" //contact eka fill nokaroth default agayak wetenna haduwa
    },
    password: {
        type: String,
        required: true
    },
    isDisabled: {
        type: Boolean,
        required: true,
        default: false
    },
    isEmailVerified: {
        type: Boolean,
        required: true,
        default: false
    }
})

const User = mongoose.model("users", userSchema); //users kiyana collection ekata me schema eka apply karanawa , mongodb eke users kiyana collection ekata me schema eka apply karanawa
export default User;