import { Router } from 'express';
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controller/ProductController.js';
import { authMiddleware } from '../middleware/AuthMiddleware.js';
import { adminMiddleware } from '../middleware/AdminMiddleware.js';

const router = Router();

router.post('/', adminMiddleware, createProduct);
router.get('/', authMiddleware, getProducts);
router.get('/:id', authMiddleware, getProductById);
router.put('/:id', adminMiddleware, updateProduct);
router.delete('/:id', adminMiddleware, deleteProduct);

export default router;
