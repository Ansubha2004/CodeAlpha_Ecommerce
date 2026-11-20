import express from "express";
import upload from "../middleware/uploadimage.js";
import {add} from "../controllers/productcontroller.js";

const router=express.Router();

router.post("/addproduct",upload.single('image'),add);

export default router;