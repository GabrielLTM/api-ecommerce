import { Router } from 'express';
import * as fornecedorController from '../controllers/fornecedor_controller.js';
import { authMiddleware } from '../middlewares/auth_middleware.js';

const router = Router();

router.use(authMiddleware); 

router.get('/', fornecedorController.listar);
router.post('/', fornecedorController.inserir);
router.get('/:id', fornecedorController.buscarPorId);
router.put('/:id', fornecedorController.atualizar);
router.delete('/:id', fornecedorController.deletar);

export default router;