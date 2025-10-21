import { Router } from 'express';
import {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient
} from '../controller/ClientController.js';
import { authMiddleware } from '../middleware/AuthMiddleware.js';
import { adminMiddleware } from '../middleware/AdminMiddleware.js';

const router = Router();

router.post('/', adminMiddleware, createClient);
router.get('/', authMiddleware, getClients);
router.get('/:id', authMiddleware, getClientById);
router.put('/:id', adminMiddleware, updateClient);
router.delete('/:id', adminMiddleware, deleteClient);

export default router;
