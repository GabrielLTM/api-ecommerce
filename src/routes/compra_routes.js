import { Router } from 'express';
import { listar, inserir } from '../controllers/compra_controller.js';
import { authMiddleware } from '../middlewares/auth_middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', listar);
router.post('/', inserir);

export default router;