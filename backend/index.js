import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import './config/db.js';

dotenv.config();
const app=express();
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.get('/test',(req,res)=>{
    res.send('ShopxEase Backend is Running');
});

app.use((req,res)=>{
    res.status(404).json({
        success: false,
        message: 'Invalid Route Accessed'
    });
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});