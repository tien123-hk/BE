import express from 'express';
import { 
    getAllProducts, 
    createProduct, 
    getProductById, 
    updateProduct, 
    deleteProduct,
    searchProduct
} from '../controllers/productController.js';

const router = express.Router();

// Get all products and search/filter
router.get('/', getAllProducts);



// CRUD operations
router.post('/add', createProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/search', searchProduct);
export default router;