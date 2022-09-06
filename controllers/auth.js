

const { response } = require('express');
const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuario');
const { generarJwt } = require('../helpers/jwt');



const login = async(req, res=response) => {

    const { email, password} = req.body;

    try {

        // Verifica email
        const usuarioDb = await Usuario.findOne({email});

        if(!usuarioDb){
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales no validas'
            });
        }

        // Verificar Cotraseña
        const validPassword = bcrypt.compareSync(password, usuarioDb.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales no validas'
            });
        }

        // Generar el JWT
        const token = await generarJwt(usuarioDb.id);

        res.json({
            ok: true,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    login
}