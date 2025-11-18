import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import verifyJWT from './middleware/auth.js';
import orderRouter from './routes/oderRouter.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI).then(
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

// Body parser error handler: returns a clear 400 when client sends invalid JSON
app.use((err, req, res, next) => {
    // body-parser sends a SyntaxError for invalid JSON
    if (err && (err instanceof SyntaxError || err.type === 'entity.parse.failed')) {
        console.error('Invalid JSON received:', err.message);
        return res.status(400).json({ message: 'Invalid JSON in request body', error: err.message });
    }
    // pass to next error handler
    return next(err);
});

// Authorization middleware
app.use(verifyJWT);

        

app.use('/api/user', userRouter); //localhost:5000/users
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);


app.listen(5000, () => {
    console.log('Server is running on port 5000');

});
