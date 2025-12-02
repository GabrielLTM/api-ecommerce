import { Router } from 'express';
import * as fornecedorController from '../controllers/fornecedor_controller.js';
import { authMiddleware } from '../middlewares/auth_middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Fornecedores
 *   description: Supplier management routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Fornecedor:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "692dbed046fc962004695f09"
 *         nome:
 *           type: string
 *           example: "Supplier Name"
 *         contato:
 *           type: string
 *           example: "contact@supplier.com"
 */

router.use(authMiddleware);

/**
 * @swagger
 * /api/fornecedores:
 *   get:
 *     summary: Get all suppliers
 *     tags: [Fornecedores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of suppliers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fornecedor'
 *       401:
 *         description: Unauthorized
 */
router.get('/', fornecedorController.listar);

/**
 * @swagger
 * /api/fornecedores:
 *   post:
 *     summary: Create a new supplier
 *     tags: [Fornecedores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "New Supplier"
 *               contato:
 *                 type: string
 *                 example: "new.contact@supplier.com"
 *     responses:
 *       201:
 *         description: Supplier created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fornecedor'
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 */
router.post('/', fornecedorController.inserir);

/**
 * @swagger
 * /api/fornecedores/{id}:
 *   get:
 *     summary: Get a supplier by ID
 *     tags: [Fornecedores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID
 *     responses:
 *       200:
 *         description: Supplier data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fornecedor'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Supplier not found
 */
router.get('/:id', fornecedorController.buscarPorId);

/**
 * @swagger
 * /api/fornecedores/{id}:
 *   put:
 *     summary: Update an existing supplier
 *     tags: [Fornecedores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Updated Supplier"
 *               contato:
 *                 type: string
 *                 example: "updated.contact@supplier.com"
 *     responses:
 *       200:
 *         description: Supplier updated successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Supplier not found
 */
router.put('/:id', fornecedorController.atualizar);

/**
 * @swagger
 * /api/fornecedores/{id}:
 *   delete:
 *     summary: Delete a supplier
 *     tags: [Fornecedores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID
 *     responses:
 *       200:
 *         description: Supplier deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Supplier not found
 */
router.delete('/:id', fornecedorController.deletar);

export default router;