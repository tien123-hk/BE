import express from 'express';
import { register, login, getEmployees } from '../controllers/authController.js';
import User from '../models/User.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/employees', getEmployees);
router.get('/accounts', async (req, res) => {
    try {
        const accounts = await User.find({}, '-password');
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching accounts', error: error.message });
    }
});

// Add delete account endpoint
router.delete('/accounts/:id', async (req, res) => {
    try {
        const deletedAccount = await User.findByIdAndDelete(req.params.id);
        if (!deletedAccount) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting account', error: error.message });
    }
});

export default router;