const express = require('express');
const auth = require('../middleware/auth');
const usersController = require('../controllers/usersController')
const router = express.Router();

// Inscription
router.post('/register',usersController.register);
// Connexion
router.post('/login',usersController.login);
// Profil utilisateur (protégé)
router.get('/me', auth,usersController.profile);

module.exports = router;