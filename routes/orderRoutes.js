import express from 'express';
import { getAllOrders, createOrder, getOrderById } from '../controllers/orderController.js';
import Order from '../models/Order.js';  // Add this import

const router = express.Router();

router.get('/', getAllOrders);
router.post('/', createOrder);
router.get('/:id', getOrderById);
router.put('/:id', async (req, res) => {  // Changed from /orders/:id to /:id
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status: status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Error updating order status' });
    }
});

export default router;