import express from 'express';
import { getWishlist, addToWishlist, removeFromWishlist, clearWishlist } from '../controllers/wishlistController.js';

const router = express.Router();

// Remove authenticateToken middleware and update routes
router.get('/:userId', getWishlist);

router.post('/add', addToWishlist);
router.delete('/:userId/:productId', removeFromWishlist);
router.delete('/clear/:userId', clearWishlist);

export default router;