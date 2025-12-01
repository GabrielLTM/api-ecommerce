import { Router } from 'express';
import {
    createCart,
    getCart,
    addItem,
    removeItem,
} from '../controllers/cart_controller.js';
import { authMiddleware } from '../middlewares/auth_middleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', createCart);
router.get('/:id', getCart);
router.post('/:id/items', addItem);
router.delete('/:id/items/:productId', removeItem);

export default router;
