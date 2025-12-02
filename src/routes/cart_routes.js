import { Router } from 'express';
import {
    createCart,
    getCart,
    addItem,
    removeItem,
} from '../controllers/cart_controller.js';
import { authMiddleware } from '../middlewares/auth_middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: Cart management routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "692dbed046fc962004695f09"
 *         clientName:
 *           type: string
 *           example: "692dbed046fc962004695f09"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *     CartItem:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           example: "692dbed046fc962004695f09"
 *         quantity:
 *           type: integer
 *           example: 2
 */

router.use(authMiddleware);

/**
 * @swagger
 * /api/carts:
 *   post:
 *     summary: Create a new cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Cart created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 */
router.post('/', createCart);

/**
 * @swagger
 * /api/carts/{id}:
 *   get:
 *     summary: Get a cart by ID
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID
 *     responses:
 *       200:
 *         description: Cart data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart not found
 */
router.get('/:id', getCart);

/**
 * @swagger
 * /api/carts/{id}/items:
 *   post:
 *     summary: Add an item to a cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart not found
 */
router.post('/:id/items', addItem);

/**
 * @swagger
 * /api/carts/{id}/items/{productId}:
 *   delete:
 *     summary: Remove an item from a cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Item removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart not found
 */
router.delete('/:id/items/:productId', removeItem);

export default router;
