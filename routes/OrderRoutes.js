import { Router } from 'express';
import {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus
} from '../controller/OrderController.js';
import { authMiddleware } from '../middleware/AuthMiddleware.js';
import { adminMiddleware } from '../middleware/AdminMiddleware.js';

const router = Router();

router.post('/', adminMiddleware, createOrder);
router.get('/', authMiddleware, getOrders);
router.get('/:id', authMiddleware, getOrderById);
router.patch('/:id', adminMiddleware, updateOrderStatus);

export default router;
