import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from "./config/db.js";
import productroutes from "./routes/productroutes.js"
import userauthroutes from "./routes/userauthroutes.js"
import wishlistroutes from "./routes/wishlistroutes.js"
import cartroutes from "./routes/cartroutes.js";
import orderroutes from "./routes/orderroutes.js";

dotenv.config();
connectDB();

const app=express();
app.use(cors({
    origin:[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:4173"
    ],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.send('ShopxEase Backend is Running');
});

app.use("/productapi",productroutes);
app.use("/authapi",userauthroutes);
app.use("/wishlistapi",wishlistroutes);
app.use("/cartapi",cartroutes);
app.use("/orderapi",orderroutes);

app.use((req,res)=>{
    res.status(404).json({
        success: false,
        message: 'Invalid Route Accessed'
    });
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});