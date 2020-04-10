const moongose = require('mongoose');

const ProjecteSchema = moongose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true
    },
    iniciat: {
        type: moongose.Types.ObjectId,
        ref: 'Usuari'
    },
    creat: {
        type: Date,
        default: Date.now()
    }
});
module.exports = moongose.model('Projecte', ProjecteSchema);