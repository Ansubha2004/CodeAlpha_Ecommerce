import usermodel from "../models/usermodel.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();

export const register=async (req,res)=>{
    try{
        const {name,email,password}= req.body;

        const finduser=await usermodel.findOne({email});
        if(finduser){
            return res.status(400).json({success:false,message:"User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);
        const newUser = await usermodel.create({
            name,
            email,
            password: hashedPassword
        });

        return res.json({success:true,message:"User created successfully",user:newUser});



    }
    catch(err){
        res.status(500).json({success:false,message: "Error signing up"});
    }

};

export const login=async (req,res)=>{};

export const logout=async (req,res)=>{};