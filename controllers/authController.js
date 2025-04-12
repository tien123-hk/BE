import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key'; // In production, use environment variables

export const register = async (req, res) => {
    try {
        const { username, email, password, role, position, phone, image } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with role and additional fields if employee
        const userData = {
            username,
            email,
            password: hashedPassword,
            role: role || 'user'
        };

        // Add additional fields if role is employee
        if (role === 'employee') {
            userData.position = position;
            userData.phone = phone;
            userData.image = image;
        }

        const user = new User(userData);
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add this to your existing authController.js
export const createEmployee = async (req, res) => {
    try {
        const { username, email, password, position, phone, image } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Employee already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const employee = new User({
            username,
            email,
            password: hashedPassword,
            role: 'employee',
            position,
            phone,
            image
        });

        await employee.save();
        res.status(201).json({ message: 'Employee created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEmployees = async (req, res) => {
    try {
        const employees = await User.find({ role: 'employee' })
            .select('-password'); // Exclude password from response
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};