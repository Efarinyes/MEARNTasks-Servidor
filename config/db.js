const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

const conectarDB = async() => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('DB connectada');
    } catch (error) {
        console.log(error);
        process.exit(1); // En cas d'error en la conexió, atura l'app
    }
};

module.exports = conectarDB;