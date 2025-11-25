import { Router } from 'express';
import { getProfile, getAllUsers } from '../controllers/user_controller.js';
import { authMiddleware } from '../middlewares/auth_middleware.js';

const router = Router();

router.get('/profile', authMiddleware, getProfile);
router.get('/', authMiddleware, getAllUsers);

export default router;