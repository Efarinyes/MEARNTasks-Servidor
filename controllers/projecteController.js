const Projecte = require('../models/Projecte');
const Feina = require('../models/Feina');
const { validationResult } = require('express-validator');


exports.crearProjecte = async(req, res) => {

    // Revisar si hi ha errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Crear un nou projecte
        const projecte = new Projecte(req.body);

        // Guardem qui ha iniciat el projecte vis JWT
        projecte.iniciat = req.usuari.id;

        // Guardem el projecte
        projecte.save();
        res.json(projecte);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hi hagut un error');
    }

};
// Obtenir projectes del usuari identificat
exports.obtenirProjectes = async(req, res) => {
    try {
        const projectes = await Projecte.find({ iniciat: req.usuari.id }).sort({ iniciat: 'asc' });
        res.json(projectes);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hi ha hagut un error');
    }
};
// Actualitzar projecte per ID
exports.actualitzarProjecte = async(req, res) => {

    // Revisar si hi ha errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Obtenim la informació del projecte 
    const { nom } = req.body;
    const nouProjecte = {};

    if (nom) {
        nouProjecte.nom = nom;
    }
    try {

        // Comprobar que projecte existeix - verificarf ID
        let projecte = await Projecte.findById(req.params.id);
        // Verifiquem que el projecte existeixi
        if (!projecte) {
            return res.status(404).json({ msg: 'Projecte no existeix' });
        }
        // Comprobem que l'usuari està autoritzat
        if (projecte.iniciat.toString() !== req.usuari.id) {
            return res.status(403).json({ msg: 'No estas autoritzat' });
        }
        // Actualitzem
        projecte = await Projecte.findByIdAndUpdate({ _id: req.params.id }, { $set: nouProjecte }, { new: true });
        res.json({ projecte });

    } catch (error) {
        console.log(error);
        res.status(500).send('Upps!, hi ha un error');
    }
};
// Eliminar projecte per ID
exports.eliminarProjecte = async(req, res) => {
    try {
        // Comprobar que projecte existeix - verificarf ID
        let projecte = await Projecte.findById(req.params.id);
        // Verifiquem que el projecte existeixi
        if (!projecte) {
            return res.status(404).json({ msg: 'Projecte no existeix' });
        }
        // Comprobem que l'usuari està autoritzat
        if (projecte.iniciat.toString() !== req.usuari.id) {
            return res.status(403).json({ msg: 'No estas autoritzat' });
        }
        // Eliminem el projecte
        await Feina.deleteMany({ projecte: req.params.id });
        await Projecte.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Projecte eliminat' });

    } catch (error) {
        console.log(error);
        return res.status(500).send('Upps!, hi ha un error');
    }
};