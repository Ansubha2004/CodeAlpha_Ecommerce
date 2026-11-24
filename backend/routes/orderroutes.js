import express from "express";
import {isLoggedIn} from "../middleware/isLoggedIn.js";
import {placeorder,orderhistory} from "../controllers/ordercontroller.js"


const router=express.Router();

router.post("/placeorder",isLoggedIn,placeorder);
router.get("/orderhistory",isLoggedIn,orderhistory);


export default router;