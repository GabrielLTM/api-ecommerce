import { Router } from 'express';
import { postBrand, getBrand, getBrands, putBrand, deleteBrand  } from '../controllers/brand_controller.js';
import { authMiddleware } from '../middlewares/auth_middleware.js';
import { adminMiddleware } from '../middlewares/admin_middleware.js';

const router = Router();

router.post('/', adminMiddleware, postBrand);
router.put('/:id', adminMiddleware, putBrand);
router.delete('/:id', adminMiddleware, deleteBrand);
router.get('/', authMiddleware, getBrands);
router.get('/:id', authMiddleware, getBrand);

export default router;