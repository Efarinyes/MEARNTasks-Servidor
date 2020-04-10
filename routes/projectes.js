const express = require('express');
const router = express.Router();
const projecteController = require('../controllers/projecteController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Crear els Projecte
// /api/projectes

// Crear projecte nou
router.post('/',
    auth, [
        check('nom', 'El nom del projecte es necessari').not().isEmpty()
    ],
    projecteController.crearProjecte
);
// Obtenir projectes de l'usuari identificat
router.get('/',
    auth,
    projecteController.obtenirProjectes
);
//  Actualitzar Projecte via ID
router.put('/:id',
    auth, [
        check('nom', 'El nom del projecte es necessari').not().isEmpty()
    ],
    projecteController.actualitzarProjecte
);
// Eliminar un projecte
router.delete('/:id',
    auth,
    projecteController.eliminarProjecte
);
module.exports = router;