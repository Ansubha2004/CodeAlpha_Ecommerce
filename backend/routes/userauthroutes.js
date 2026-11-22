import express from "express";
import {register,login,logout,profile} from "../controllers/userauthcontroller.js"
import { authsignupValidation, authloginValidation } from "../middleware/authvalidation.js"
import {isLoggedIn} from "../middleware/isLoggedIn.js"

const router=express.Router();


router.post("/register", authsignupValidation,register);
router.post('/login',authloginValidation,login);
router.get('/logout',logout)
router.get('/profile',isLoggedIn,profile);

export default router;