import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function saveUser(req, res) {

    const hashedPassword = bcrypt.hashSync(req.body.password, 10); //password eka hash karanawa
    
    const user = new User({ 
        email: req.body.email,
        firstName: req.body.firstName, //request body eke firstName eka gannawa
        lastName: req.body.lastName,
        password: hashedPassword, //hash karapu password eka database ekata yawanna
    }) //new user object ekak hadanawa model eka use karala
    user.save().then(  
        () => {
            res.json({ message: 'user data inserted successfully' });
        } //database ekata save karanawa
    ).catch(
        () => {
            res.json({ message: 'error while inserting user data'});
        }
    )
}

export function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ 
        email: email
     }).then((user) => {
        if (user == null){
            res.json({ message: 'Invalid email' }); //email eka database eke naththam
        }else{
            const isPasswordValid = bcrypt.compareSync(password, user.password); //password eka verify karanawa
            if (isPasswordValid){
                
                const userData = {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    contact: user.contact,
                    isDesabled: user.isDisabled
                } //user data eka object ekakata store karanawa

                const token = jwt.sign(userData, "randomsecret") //token ekak generate karanawa
                res.json({ 
                    message: 'Login successful', 
                    token: token
                }); //login success una kiyala response ekak yawanawa

            }else{
                res.json({ message: 'Invalid password' });
            }
        }
     })
}