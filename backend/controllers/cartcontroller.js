import usermodel from "../models/usermodel.js"
import productmodel from "../models/productmodel.js"

export const addcart = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity = 1 } = req.body;

        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Invalid quantity"
            });
        }

        const user = await usermodel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const product = await productmodel.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const existingProduct = user.cart.find(
            (item) => item.product.toString() === id
        );

        if (existingProduct) {
            existingProduct.quantity = quantity;
        } else {
            user.cart.push({
                product: id,
                quantity
            });
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Product added to cart",
            cart: user.cart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in add to cart API",
            error: error.message
        });
    }
};

export const getcart = async (req, res) => {
    try {
        const user = await usermodel
            .findById(req.user.id)
            .populate("cart.product");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            cart: user.cart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Get all carts",
            error
        });
    }
};


export const removespecificcart=async (req,res)=>{
    try{
        const {id}=req.params;
        const user = await usermodel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        user.cart=user.cart.filter((item)=>item.product.toString()!==id);
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Product removed from cart",
            cart: user.cart
        });

    }
    catch(error)
    {
        return res.json({
            success:false,
            message:"Error in removing specific cart",
            error
        })

    }
}



export const removeallcarts=async (req,res)=>{
    try
    {
        const user=await usermodel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.cart=[];
        await user.save();
        return res.json({
            success:true,
            message:"Cleared all carts of the user"
        })
        }

    
    catch(error)
    {
        return res.json({
            success:false,
            message:"Issue related to removing all carts",
            error
        })
    }
}