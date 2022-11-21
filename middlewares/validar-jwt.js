const { response } = require("express");

const jwt = require("jsonwebtoken");

const Usuario = require('../models/usuario');


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

const validarAdminRole = async (req, res = response, next) => {

    const uid = req.uid;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if(usuarioDB.role !== 'ADMIN_ROLE'){
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer esto'
            });
        }

        next();

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const validarAdminRoleOMismousuario = async (req, res = response, next) => {

    const uid = req.uid;
    const id = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if(usuarioDB.role !== 'ADMIN_ROLE' && uid !== id){
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer esto'
            });
        }

        next();

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    validarJwt,
    validarAdminRole,
    validarAdminRoleOMismousuario
}