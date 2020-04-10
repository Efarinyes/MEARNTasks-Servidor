const Usuari = require('../models/Usuari');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuari = async(req, res) => {

    // Revisem si hi ha errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Obtenim email i password 
    const { email, password } = req.body;

    try {
        // Comprobem que sigui un usuari registrat
        let usuari = await Usuari.findOne({ email });
        if (!usuari) {
            return res.status(400).json({
                msg: 'Usuari no existeix'
            });
        }
        // Comprobem password
        const passCorrecte = await bcryptjs.compare(password, usuari.password);
        if (!passCorrecte) {
            return res.status(400).json({
                msg: 'Contrassenya incorrecta'
            });
        }
        // Generem el JWT un cop validades les dades
        // Creem y signem el JWT 
        const payload = {
            usuari: {
                id: usuari.id
            }
        };
        // Firme del token
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;
            // missatge de confirmació
            res.status(200).json({ token });
        });

    } catch (error) {
        console.log(error);
    }
};
// Obtenir quin usuari esta identificat
exports.usuariIdentificat = async(req, res) => {
    try {
        const usuari = await Usuari.findById(req.usuari.id).select('-password');
        res.json({ usuari });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hi hagut un error' });
    }
}