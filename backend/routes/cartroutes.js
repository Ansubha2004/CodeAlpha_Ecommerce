import express from "express";
import {addcart,getcart,removespecificcart,removeallcarts} from "../controllers/cartcontroller.js";
import {isLoggedIn} from "../middleware/isLoggedIn.js"

const router=express.Router();


router.post("/addtocart/:id",isLoggedIn,addcart);
router.get("/getcart",isLoggedIn,getcart);
router.delete("/removespecificcart/:id",isLoggedIn,removespecificcart);
router.delete("/clearcarts",isLoggedIn,removeallcarts);

export default router;