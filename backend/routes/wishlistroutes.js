import express from "express";
import { addtowishlist ,getwishlist} from "../controllers/wishlistcontroller.js";
import {isLoggedIn} from "../middleware/isLoggedIn.js";



const router=express.Router();

router.post("/addtowishlist/:id",isLoggedIn,addtowishlist);
router.get("/getwishlist",isLoggedIn,getwishlist);

export default router;