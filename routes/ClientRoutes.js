import { Router } from 'express';
import {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient
} from '../controller/ClientController.js';
import { authMiddleware } from '../middleware/AuthMiddleware.js';

const router = Router();

router.post('/', authMiddleware, createClient);
router.get('/', authMiddleware, getClients);
router.get('/:id', authMiddleware, getClientById);
router.put('/:id', authMiddleware, updateClient);
router.delete('/:id', authMiddleware, deleteClient);

export default router;
