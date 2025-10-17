const express = require('express');
const auth = require('../middleware/auth');
const usersController = require('../controllers/usersController');
const { validateRegister, validateLogin } = require('../middleware/validation.js');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion de l'authentification et des utilisateurs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscrire un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: JohnDoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: motdepasse123
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/register', validateRegister, usersController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connecter un utilisateur existant
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: motdepasse123
 *     responses:
 *       200:
 *         description: Connexion réussie (token JWT renvoyé)
 *       401:
 *         description: Identifiants incorrects
 */
router.post('/login', validateLogin, usersController.login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Obtenir les informations du profil utilisateur connecté
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []   # 🔐 Authentification par token JWT
 *     responses:
 *       200:
 *         description: Informations du profil utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 66f1c03ae5f5b3bb243f87e5
 *                 username:
 *                   type: string
 *                   example: JohnDoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *       401:
 *         description: Token manquant ou invalide
 */
router.get('/me', auth, usersController.profile);

module.exports = router;
