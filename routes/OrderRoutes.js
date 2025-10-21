import { Router } from 'express';
import {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus
} from '../controller/OrderController.js';
import { authMiddleware } from '../middleware/AuthMiddleware.js';

const router = Router();

router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getOrders);
router.get('/:id', authMiddleware, getOrderById);
router.patch('/:id', authMiddleware, updateOrderStatus);

export default router;
