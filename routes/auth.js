// Rutes per la autentificació d'usuaris

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Iniciar Sessió
// /api/auth

router.post('/',
    authController.autenticarUsuari
);
// Obtenir usuari identificat
router.get('/',
    auth,
    authController.usuariIdentificat
)

module.exports = router;