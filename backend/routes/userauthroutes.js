import express from "express";
import {register,login,logout} from "../controllers/userauthcontroller.js"
import { authsignupValidation, authloginValidation } from "../middleware/authvalidation.js"

const router=express.Router();


router.post("/register", authsignupValidation,register);


export default router;