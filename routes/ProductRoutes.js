import { Router } from 'express';
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controller/ProductController.js';
import { authMiddleware } from '../middleware/AuthMiddleware.js';

const router = Router();

router.post('/', authMiddleware, createProduct);
router.get('/', authMiddleware, getProducts);
router.get('/:id', authMiddleware, getProductById);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
