import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category:{
        type:String,
        required:true,
        enum:['Electronics','Clothing','Home & Garden','Sports','Books']
    },
    image: {
        type: String,
        required: true,
    },
    imageid:{
        type: String,
        unique:true
    }
    
});

export default mongoose.model("Product", productSchema);