import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    imga: String,
    imgb: String,
    stock: Number,
    description: String,
    category: String
});

export default mongoose.model('Wishlist', wishlistSchema);