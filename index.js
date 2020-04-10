const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// Creacio del servidor

const app = express();
// Port de la app
const PORT = process.env.PORT || 4000;

// conectem amb la BBDD
conectarDB();

// Habilitar CORS
app.use(cors());

// Habilitem express.json
app.use(express.json({ extended: true }));

// Importem les rutes de l'API
app.use('/api/usuaris', require('./routes/usuaris'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projectes', require('./routes/projectes'));
app.use('/api/feines', require('./routes/feines'));

// arrenquem servidor
app.listen(PORT, () => {
    console.log(`Servidor corrent pel port ${PORT}`);
});