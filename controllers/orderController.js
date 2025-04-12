import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
    try {
        const { customer, items, totalAmount } = req.body;
        const order = new Order({
            customer,
            items,
            totalAmount,
            status: 'pending',
            createdAt: new Date()
        });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('items.product', 'name price')  // Populate product details
            .sort({ createdAt: -1 });  // Sort by newest first
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.product');
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};