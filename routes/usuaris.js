// Rutes per rear usuaris

const express = require('express');
const router = express.Router();
const usuariController = require('../controllers/usuariController');

const { check } = require('express-validator');

// Crear un usuari
// /api/usuaris

router.post('/', [
        check('nom', 'El nom és obligatori').not().isEmpty(),
        check('email', 'Afegeix un correu vàlid').isEmail(),
        check('password', 'El password requereix mínim 6 caracters').isLength({ min: 6 })
    ],
    usuariController.crearUsuari
);

module.exports = router;