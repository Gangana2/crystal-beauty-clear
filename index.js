import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import jwt from 'jsonwebtoken';

const app = express();

mongoose.connect("mongodb+srv://admin:123@cluster0.ignz4jd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    ()=>{
        console.log('Connected to database');
    }
).catch(
    ()=>{
        console.log('Connection failed');
    }
)


//mongodb+srv://admin:123@cluster0.ignz4jd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app.use(bodyParser.json());  //middleware

// Authorization middleware
app.use((req, res, next) => {
    const header = req.headers['authorization'] || req.headers['Authorization'];
    if (header != null) {
        const token = header.replace(/^Bearer\s+/i, '');
        jwt.verify(token, 'randomsecret', (err, decoded) => {
            if (err) {
                console.error('JWT verification failed:', err.message);
                // don't attach user if token invalid
            } else if (decoded) {
                req.user = decoded;
                console.log('JWT decoded:', decoded);
            }
            // continue regardless of token validity
            return next();
        });
        return; // jwt.verify callback will call next()
    }

    // No Authorization header: continue without a user
    return next();
});

        

app.use('/api/user', userRouter); //localhost:5000/users
app.use('/api/product', productRouter);


app.listen(5000, () => {
    console.log('Server is running on port 5000');

});
