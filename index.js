import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import studentRouter from './routes/studentRouter.js';
import itemRouter from './routes/itemRouter.js';
import userRouter from './routes/userRouter.js';

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

app.use('/students', studentRouter); //localhost:5000/students
app.use('/items', itemRouter); //localhost:5000/items
app.use('/api/user', userRouter); //localhost:5000/users


app.listen(5000, () => {
    console.log('Server is running on port 5000');

});
