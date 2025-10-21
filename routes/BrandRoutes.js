import { Router } from 'express';
import { postBrand, getBrandById, getBrands,  } from '../controller/BrandController.js';
import { authMiddleware } from '../middleware/AuthMiddleware.js';

const router = Router();

router.post('/', authMiddleware, postBrand);
router.get('/', authMiddleware, getBrands);
router.get('/:id', authMiddleware, getBrandById);

export default router;