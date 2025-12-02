import { Router } from 'express';
import { getProfile, getAllUsers } from '../controllers/user_controller.js';
import { authMiddleware } from '../middlewares/auth_middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "692dbed046fc962004695f09"
 *         name:
 *           type: string
 *           example: "Test User"
 *         email:
 *           type: string
 *           example: "test@example.com"
 *         role:
 *           type: string
 *           enum: [USER, ADMIN]
 *           example: "USER"
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.get('/profile', authMiddleware, getProfile);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, getAllUsers);

export default router;