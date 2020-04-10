const Feina = require('../models/Feina');
const Projecte = require('../models/Projecte');
const { validationResult } = require('express-validator');

// Crear una nova feina associada a un projete
exports.crearFeina = async(req, res) => {
    // Revisar si hi ha errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Comprobem que hi ha projecte i que existeix

    // Obtenim el projecte

    try {
        const { projecte } = req.body;
        const projecteActiu = await Projecte.findById(projecte);
        if (!projecteActiu) {
            return res.status(404).json({ msg: 'Projecte no trobat' });
        }
        // Revisem que el projecte actiu sigui de l'usuari activat
        if (projecteActiu.iniciat.toString() !== req.usuari.id) {
            return res.status(403).json({ msg: 'No estas autoritzat' });
        }
        // Es crea la feina
        const feina = new Feina(req.body);
        await feina.save();
        res.json({ feina });

    } catch (error) {
        console.log(error);
        res.status(500).send('Upps!, hi hagut un error');
    }
};

// Obtenir feines associades a un projecte
exports.obtenirFeines = async(req, res) => {

    try {
        const { projecte } = req.query;

        // console.log(req.query);

        const projecteActiu = await Projecte.findById(projecte);
        if (!projecteActiu) {
            return res.status(404).json({ msg: 'Projecte no trobat' });
        }
        // Revisem que el projecte actiu sigui de l'usuari activat
        if (projecteActiu.iniciat.toString() !== req.usuari.id) {
            return res.status(403).json({ msg: 'No estas autoritzat' });
        }
        // Obtenim les feines
        const feines = await Feina.find({ projecte }).sort({ iniciat: -1 });
        res.json({ feines });

    } catch (error) {
        console.log(error);
        res.status(500).send('Upps!, hi hagut un error');
    }
};

// Actuelitzem una feina per id
exports.actualitzarFeina = async(req, res) => {
    try {
        const { projecte, nom, estat } = req.body;

        // Revisem que la feina existeixi
        let feina = await Feina.findById(req.params.id);
        if (!feina) {
            return res.status(404).json({ msg: 'Feina no existeix' });
        }

        // Obtenim projecte associat a la feina 
        const projecteActiu = await Projecte.findById(projecte);

        // Revisem que el projecte actiu sigui de l'usuari activat
        if (projecteActiu.iniciat.toString() !== req.usuari.id) {
            return res.status(403).json({ msg: 'No estas autoritzat' });
        }

        // Crear un objecte nou amb les dades obtingudes
        const novaFeina = {};
        novaFeina.nom = nom;
        novaFeina.estat = estat;

        // Guardem la modificació de la feina
        feina = await Feina.findByIdAndUpdate({ _id: req.params.id }, novaFeina, { new: true });
        res.json({ feina });


    } catch (error) {
        console.log(error);
        res.status(500).send('Upps!, hi hagut un error');
    }
};

// Eliminar feina associada a projecte per id
exports.eliminarFeina = async(req, res) => {
    try {
        const { projecte } = req.query;

        // Revisem que la feina existeixi
        let feina = await Feina.findById(req.params.id);
        if (!feina) {
            return res.status(404).json({ msg: 'Feina no existeix' });
        }

        // Obtenim projecte associat a la feina 
        const projecteActiu = await Projecte.findById(projecte);

        // Revisem que el projecte actiu sigui de l'usuari activat
        if (projecteActiu.iniciat.toString() !== req.usuari.id) {
            return res.status(403).json({ msg: 'No estas autoritzat' });
        }
        // Eliminem
        await Feina.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Feina borrada' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Upps!, hi hagut un error');
    }
};