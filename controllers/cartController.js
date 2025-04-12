import Cart from '../models/Cart.js';

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, name, price, img, quantity } = req.body;
        const cartItem = new Cart({
            userId,
            productId,
            name,
            price,
            img,
            quantity
        });
        await cartItem.save();
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cartItems = await Cart.find({ userId });
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCartItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;
        const updatedItem = await Cart.findByIdAndUpdate(
            itemId,
            { quantity },
            { new: true }
        );
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.params;
        await Cart.findOneAndDelete({ userId, _id: itemId });
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;
        await Cart.deleteMany({ userId });
        res.json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};