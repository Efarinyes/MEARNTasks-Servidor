const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

    // Llegim el Token del header
    const token = req.header('x-auth-token');



    // Revisar si no hi ha Token
    if (!token) {
        return res.status(401).json({ msg: 'Token no valid, ingressa de nou' });
    }
    // validar el Token
    try {
        const xifrat = jwt.verify(token, process.env.SECRETA);
        req.usuari = xifrat.usuari;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Credencials no valides' });
    }
}