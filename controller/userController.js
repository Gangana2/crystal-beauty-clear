import User from "../model/user.js";
import bcrypt from "bcrypt";


export function saveUser(req, res) {

    const hashedPassword = bcrypt.hashSync(req.body.password, 10); //password eka hash karanawa
    
    const user = new User({ 
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword, //hash karapu password eka database ekata yawanna
    })
    user.save().then(
        () => {
            res.json({ message: 'user data inserted successfully' });
        }
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
        console.log(user);
     })
}