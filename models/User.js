import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'employee', 'admin'], default: 'user' },
    // Employee specific fields
    position: { type: String },
    phone: { type: String },
    image: { type: String }
}, { timestamps: true });

export default mongoose.model('User', userSchema);