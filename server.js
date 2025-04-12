import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Admin from './models/Admin.js';
import bcrypt from 'bcryptjs';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/auth.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 8086;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
// Add this function before your server starts
const initializeAdmin = async () => {
    try {
        const adminExists = await Admin.findOne({ username: 'admin' });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            const admin = new Admin({
                username: 'admin',
                password: hashedPassword
            });
            await admin.save();
            console.log('Admin account created successfully');
        }
    } catch (error) {
        console.error('Error initializing admin:', error);
    }
};
mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        await initializeAdmin();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
// Add this after your mongoose.connect()
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Routes
app.use('/BE/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/wishlist', wishlistRoutes);
app.use('/cart', cartRoutes);
app.use('/admin', adminRoutes);
app.use('/orders', orderRoutes);
app.use('/BE/contact', contactRoutes);