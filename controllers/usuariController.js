const Usuari = require('../models/Usuari');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.crearUsuari = async(req, res) => {

    // Revisem si hi ha errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // desestructurem la resposta
    const { email, password } = req.body;

    try {
        // Revisem que l'usuari no estigui registrat
        let usuari = await Usuari.findOne({ email });
        if (usuari) {
            return res.status(400).json({ msg: 'Usuari ja registrat ' });
        }
        // Creem el nou usuari
        usuari = new Usuari(req.body);

        // Encriptem el password
        const salt = await bcryptjs.genSalt(10);
        usuari.password = await bcryptjs.hash(password, salt);

        // Guardem el nou usuari
        await usuari.save();

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
            res.status(200).json({ token })
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hi hagut un error ' });
    }
};