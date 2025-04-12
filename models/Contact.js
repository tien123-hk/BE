import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Contact', contactSchema);