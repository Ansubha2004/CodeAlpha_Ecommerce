import express from "express";
import upload from "../middleware/uploadimage.js";
import {add,get} from "../controllers/productcontroller.js";

const router=express.Router();

router.post("/addproduct",upload.single('image'),add);
router.get("/getproduct",get);

export default router;