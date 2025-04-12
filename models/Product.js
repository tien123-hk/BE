import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    imga: { type: String },
    imgb: { type: String },
    category: { type: String, required: true },
    stock: { type: Number, required: true }
}, {
    timestamps: true
});

export default mongoose.model('Product', productSchema);