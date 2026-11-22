import usermodel from "../models/usermodel.js";
import productmodel from "../models/productmodel.js"

export const addtowishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usermodel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const product = await productmodel.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        if (user.favourites.includes(id)) {
            return res.status(400).json({
                success: false,
                message: "Product already in favourites",
            });
        }
        user.favourites.push(id);
        await user.save();

        res.json({
            success: true,
            message: "Added to favourites",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error is adding to wishlist api",
            error: error.message
        });
    }
}



export const getwishlist = async (req, res) => {
    try {
        const user = await usermodel.findById(req.user.id).populate("favourites");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: user.favourites,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching wishlist",
            error: error.message,
        });
    }
}



export const removewishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.id;
        const user = await usermodel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }


        user.favourites = user.favourites.filter((id) => id.toString() !== productId);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Product removed from wishlist successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error removing product from wishlist",
            error: error.message,
        });
    }
}