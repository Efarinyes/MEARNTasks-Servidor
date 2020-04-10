const moongose = require('mongoose');

const UsusarisSchema = moongose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    registre: {
        type: Date,
        default: Date.now()
    }
});

module.exports = moongose.model('Usuari', UsusarisSchema);