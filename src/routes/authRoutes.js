const express = require('express');
const auth = require('../middleware/auth');
const usersController = require('../controllers/usersController');
const { validateRegister, validateLogin } = require('../middleware/validation.js');
const router = express.Router();

// Inscription
router.post('/register',validateRegister,usersController.register);
// Connexion
router.post('/login',validateLogin,usersController.login);
// Profil utilisateur (protégé)
router.get('/me', auth,usersController.profile);

module.exports = router;