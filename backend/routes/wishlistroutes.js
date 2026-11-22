import express from "express";
import { addtowishlist ,getwishlist,removewishlist} from "../controllers/wishlistcontroller.js";
import {isLoggedIn} from "../middleware/isLoggedIn.js";



const router=express.Router();

router.post("/addtowishlist/:id",isLoggedIn,addtowishlist);
router.get("/getwishlist",isLoggedIn,getwishlist);
router.delete("/removewishlist/:id",isLoggedIn,removewishlist)

export default router;