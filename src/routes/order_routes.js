import { Router } from 'express';
import {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
} from '../controllers/order_controller.js';
import { authMiddleware } from '../middlewares/auth_middleware.js';
import { adminMiddleware } from '../middlewares/admin_middleware.js';

const router = Router();

router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getOrders);
router.get('/:id', authMiddleware, getOrderById);
router.patch('/:id', authMiddleware, updateOrderStatus);
router.delete('/:id', adminMiddleware, deleteOrder);

export default router;
