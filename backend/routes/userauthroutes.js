import express from "express";
import {register,login,logout,profile} from "../controllers/userauthcontroller.js"
import { authsignupValidation, authloginValidation } from "../middleware/authvalidation.js"

const router=express.Router();


router.post("/register", authsignupValidation,register);
router.post('/login',authloginValidation,login);
router.get('/logout',logout)
router.get('/profile',profile);

export default router;