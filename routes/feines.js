const express = require('express');
const router = express.Router();
const feinaController = require('../controllers/feinaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');


// Crear Feina
// api/feines
router.post('/',
    auth, [
        check('nom', 'El nom és necessari').not().isEmpty(),
        check('projecte', 'El projecte és necessari').not().isEmpty()
    ],
    feinaController.crearFeina
);
// Obtenir feines associades a un projecte
router.get('/',
    auth,
    feinaController.obtenirFeines
);

// Modificar una feina per ID
router.put('/:id',
    auth,
    feinaController.actualitzarFeina
);

// Borrar una feina per id
router.delete('/:id',
    auth,
    feinaController.eliminarFeina

);


module.exports = router;