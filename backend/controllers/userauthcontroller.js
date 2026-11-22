import usermodel from "../models/usermodel.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 10 * 60 * 60 * 1000,
    path: "/"
};

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const finduser = await usermodel.findOne({ email });
        if (finduser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await usermodel.create({
            name,
            email,
            password: hashedPassword
        });

        return res.json({ success: true, message: "User created successfully", user: newUser });



    }
    catch (err) {
        res.status(500).json({ success: false, message: "Error signing up" });
    }

};




export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const finduser = await usermodel.findOne({ email });
        if (!finduser) {
            return res.json({
                success: false,
                message: "User Not Found - register now"
            })
        }
        const ismatch = await bcrypt.compare(password, finduser.password);
        if (!ismatch) {
            return res.json({
                success: false,
                message: "Invalid credentials"
            })
        }
        const token = jwt.sign({
            id: finduser._id,
            email: finduser.email,
            name: finduser.name
        }, process.env.JWT_SECRET);

        res.cookie('token', token, cookieOptions)
        return res.json({ success: true, message: "User logged in successfully", user: finduser });

    }
    catch (error) {
        res.json({
            success: false,
            message: "error in login api",
            error
        })
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", cookieOptions);

        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    }
    catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: "Logout failed"
        });
    }
};




export const profile = async (req, res) => {
    try {
      const user = await usermodel
        .findById(req.user.id)
        .select("-password");
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        data: user,
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching profile",
      });
    }
  };
  