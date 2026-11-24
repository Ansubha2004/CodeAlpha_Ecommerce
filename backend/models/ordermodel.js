import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    customer:{
        name:{
            type:String,
            required:true
        },
        address: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true
        }
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            name: String,
            description: String,
            price: Number,
            category: String,
            image: String,
            quantity: {
                type:Number,
                required:true,
                min:1
            }
        }
    ],
    total: {
        type: Number,
        required: true
    },

    payment: {
        type: String,
        enum: ["COD", "Online"],
        default: "COD"
    },
    orderStatus: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered"],
        default: "Processing"
    }
}, { timestamps: true });

export default mongoose.model("Order",orderSchema);