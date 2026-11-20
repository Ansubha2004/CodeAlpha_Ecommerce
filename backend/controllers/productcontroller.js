
import productmodel from "../models/productmodel.js";
import cloudinary from "../config/cloudinary.js";

export const add = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "Fill all credentials"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Product Image not uploaded"
            });
        }

        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        const result = await cloudinary.uploader.upload(base64Image, {
            folder: "product_folder"
        });

        const uploadproduct = await productmodel.create({
            name,
            description,
            price: Number(price),
            category,
            image: result.secure_url,
            imageid: result.public_id
        });

        return res.status(201).json({
            success: true,
            message: "Product uploaded successfully",
            data: uploadproduct
        });

    } catch (error) {
        console.error("Product API Error:", error);

        return res.status(error.http_code || 500).json({
            success: false,
            message: "Error in product API",
            error: error.message
        });
    }
};
