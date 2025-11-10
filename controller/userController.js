import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 

export function saveUser(req, res) {
    if (req.body && req.body.role === 'admin') {
        if (!req.user) {
            return res.status(403).json({ message: 'Please login as admin before creating an admin' });
        }
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to create an admin account' });
        }
    }


    const hashedPassword = bcrypt.hashSync(req.body.password, 10); //password eka hash karanawa
    
    const user = new User({ //new user object ekak hadanawa model eka use karala
        email: req.body.email,
        firstName: req.body.firstName, //request body eke firstName eka gannawa
        lastName: req.body.lastName,
        password: hashedPassword, //hash karapu password eka database ekata yawanna
        role: req.body.role,
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
    const email = req.body.email; //get email from request body
    const password = req.body.password;

    User.findOne({ 
        email: email
     }).then((user) => {
        if (user == null){
            res.json({ message: 'Invalid email' }); //email eka database eke naththam
        }else{
            const isPasswordValid = bcrypt.compareSync(password, user.password); //password eka verify karanawa
            if (isPasswordValid){
                
                const userData = {  //usage wisthara dala jason ekak hadanwa
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    contact: user.contact,
                    isDisabled: user.isDisabled,
                    isEmailVerified: user.isEmailVerified
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