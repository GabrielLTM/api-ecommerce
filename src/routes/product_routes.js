import { Router } from 'express';
import {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product_controller.js';
import { authMiddleware } from '../middlewares/auth_middleware.js';
import { adminMiddleware } from '../middlewares/admin_middleware.js';

const router = Router();

router.post('/', adminMiddleware, createProduct);
router.get('/', authMiddleware, getProducts);
router.get('/:id', authMiddleware, getProduct);
router.put('/:id', adminMiddleware, updateProduct);
router.delete('/:id', adminMiddleware, deleteProduct);

export default router;
