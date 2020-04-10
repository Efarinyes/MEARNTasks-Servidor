const moongose = require('mongoose');

const FeinaSchema = moongose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true
    },
    estat: {
        type: Boolean,
        default: false
    },
    iniciat: {
        type: Date,
        default: Date.now()
    },
    projecte: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Projecte'
    }
});
module.exports = moongose.model('Feina', FeinaSchema);