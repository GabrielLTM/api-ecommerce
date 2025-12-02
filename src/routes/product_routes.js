import { Router } from 'express';
import {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product_controller.js';
import { authMiddleware } from '../middlewares/auth_middleware.js';
import { adminMiddleware } from '../middlewares/admin_middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "692dbed046fc962004695f09"
 *         name:
 *           type: string
 *           example: "Laptop"
 *         description:
 *           type: string
 *           example: "A powerful laptop"
 *         price:
 *           type: number
 *           example: 1200.50
 *         stock:
 *           type: integer
 *           example: 10
 *         brandId:
 *           type: string
 *           example: "692dbed046fc962004695f09"
 *         categoryId:
 *           type: string
 *           example: "692dbed046fc962004695f09"
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - estoque
 *               - brandId
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Smartphone"
 *               description:
 *                 type: string
 *                 example: "A new smartphone"
 *               price:
 *                 type: number
 *                 example: 800
 *               stock:
 *                 type: integer
 *                 example: 25
 *               brandId:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Only admins can create products
 */
router.post('/', adminMiddleware, createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.get('/:id', authMiddleware, getProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tablet"
 *               description:
 *                 type: string
 *                 example: "A new tablet"
 *               price:
 *                 type: number
 *                 example: 500
 *               stock:
 *                 type: integer
 *                 example: 15
 *               brandId:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Only admins can update products
 *       404:
 *         description: Product not found
 */
router.put('/:id', adminMiddleware, updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Only admins can delete products
 *       404:
 *         description: Product not found
 */
router.delete('/:id', adminMiddleware, deleteProduct);

export default router;
