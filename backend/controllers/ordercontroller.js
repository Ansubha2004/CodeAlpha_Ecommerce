import ordermodel from "../models/ordermodel.js";
import usermodel from "../models/usermodel.js";
import {orderstatus} from "../utils/orderstatus.js"


export const placeorder=async (req,res)=>{
    try{
        const {name,address,mobile,payment}=req.body;
        if (!name || !address || !mobile) {
            return res.status(400).json({
                success: false,
                message: "Please provide all delivery details"
            });
        }

        if (!["COD", "Online"].includes(payment)) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment method"
            });
        }
        const user=await usermodel.findById(req.user.id).populate("cart.product");
        if(!user)
        {
            return res.json({
                success:false,
                message:"User not found"
            })
        }

        if (!user.cart || user.cart.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Your cart is empty"
            });
        }
        const products = user.cart.map((item)=>{
            if (!item.product) {
                throw new Error("A product in your cart no longer exists");
            }

            return {
                product: item.product._id,
                name: item.product.name,
                description: item.product.description,
                price: item.product.price,
                category: item.product.category,
                image: item.product.image,
                quantity: item.quantity
            }
        });

        const total= products.reduce((t,item)=>t+item.price*item.quantity,0);

        const neworder=await ordermodel.create({
            user:req.user.id,
            customer:{name,address,mobile},
            products,
            total,
            payment
        })

        user.cart=[];
        await user.save();

        orderstatus(neworder);

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order: neworder
        });


    }
    catch(error)
    {
        return res.json({
            success:false,
            message:"Error placing order api",
            error
        })
    }
}


export const orderhistory=async (req,res)=>{
    try{
        const orderdetails=await ordermodel.find({user:req.user.id}).sort({createdAt:-1});

        if(!orderdetails)
        {
            return res.json({
                success:false,
                message:"No orders"
            })
        }

        return res.json({
            success:true,
            message:"Order details fetched successfully",
            orderdetails
        })
    }
    catch(error)
    {
        return res.json({
            success:false,
            message:"Failed to fetch history of order",
            error
        })
    }
}

