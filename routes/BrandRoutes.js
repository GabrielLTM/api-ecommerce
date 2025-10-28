import { Router } from 'express';
import { postBrand, getBrand, getBrands,  } from '../controller/BrandController.js';
import { authMiddleware } from '../middleware/AuthMiddleware.js';
import { adminMiddleware } from '../middleware/AdminMiddleware.js';

const router = Router();

router.post('/', adminMiddleware, postBrand);
router.put('/:id', adminMiddleware, putBrand);
router.delete('/:id', adminMiddleware, deleteBrand);
router.get('/', authMiddleware, getBrands);
router.get('/:id', authMiddleware, getBrand);

export default router;