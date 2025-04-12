import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';




export const clearWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.user.userId });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        wishlist.products = [];
        wishlist.updatedAt = Date.now();
        await wishlist.save();

        res.json({ message: 'Wishlist cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update controller functions to work without authentication
export const addToWishlist = async (req, res) => {
    try {
        const { userId, productId, name, price, img, imga, imgb, stock, description, category } = req.body;
        const wishlistItem = new Wishlist({
            userId,
            productId,
            name,
            price,
            img,
            imga,
            imgb,
            stock,
            description,
            category
        });
        await wishlistItem.save();
        res.status(201).json(wishlistItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getWishlist = async (req, res) => {
    try {
        const { userId } = req.params;
        const wishlist = await Wishlist.find({ userId }).select('productId name price img stock');
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        await Wishlist.findOneAndDelete({ userId, productId });
        res.json({ message: 'Item removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};