const { response } = require("express");

const jwt = require("jsonwebtoken");


const validarJwt = (req, res=response, next) => {

    // Leer el token
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            errors: 'Se requiere un token'
        });
    }

    // Verificar JWT
    try {
        
        const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.uid = uid;
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            errors: 'token Incorrecto'
        });
    }

    next();
}

module.exports = {
    validarJwt
}