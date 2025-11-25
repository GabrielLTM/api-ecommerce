import { Router } from 'express';
import {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient
} from '../controllers/client_controller.js';
import { authMiddleware } from '../middlewares/auth_middleware.js';
import { adminMiddleware } from '../middlewares/admin_middleware.js';

const router = Router();

router.post('/', adminMiddleware, createClient);
router.get('/', authMiddleware, getClients);
router.get('/:id', authMiddleware, getClientById);
router.put('/:id', adminMiddleware, updateClient);
router.delete('/:id', adminMiddleware, deleteClient);

export default router;
