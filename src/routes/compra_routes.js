import { Router } from 'express';
import { listar, inserir } from '../controllers/compra_controller.js';
import { authMiddleware } from '../middlewares/auth_middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Compras
 *   description: Purchase management routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Compra:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "692dbed046fc962004695f09"
 *         fornecedorId:
 *           type: string
 *           example: "692dbed046fc962004695f09"
 *         data:
 *           type: string
 *           format: date-time
 *           example: "2025-01-01T12:00:00Z"
 *         total:
 *           type: number
 *           example: 100.50
 *         itens:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CompraItem'
 *     CompraItem:
 *       type: object
 *       properties:
 *         produtoId:
 *           type: string
 *           example: "692dbed046fc962004695f09"
 *         quantidade:
 *           type: integer
 *           example: 2
 *         preco:
 *           type: number
 *           example: 50.25
 */

router.use(authMiddleware);

/**
 * @swagger
 * /api/compras:
 *   get:
 *     summary: Get all purchases
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of purchases
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Compra'
 *       401:
 *         description: Unauthorized
 */
router.get('/', listar);

/**
 * @swagger
 * /api/compras:
 *   post:
 *     summary: Create a new purchase
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fornecedorId
 *               - itens
 *             properties:
 *               fornecedorId:
 *                 type: string
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     produtoId:
 *                       type: string
 *                     quantidade:
 *                       type: integer
 *                     preco:
 *                       type: number
 *     responses:
 *       201:
 *         description: Purchase created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compra'
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 */
router.post('/', inserir);

export default router;