
const { response } = require('express');
const Usuario = require('../models/usuario');



const  getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find();

    res.json({
        ok:true,
        usuarios
    })
}

const  crearUsuario = async (req, res = response) => {

    const {email, password, nombre}  = req.body;


    try {
        // Verifica si el usuario existe en la BD
        const usuarioExiste = await Usuario.findOne({email});
        if(usuarioExiste){
            return res.status(400).json({
                ok:true,
                msg: 'Usuario ya existe en la base de datos'
            });
        }

        const usuario = new Usuario( req.body );
        await usuario.save();


        res.json({
            ok:true,
            usuario
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}


module.exports = {
    getUsuarios,
    crearUsuario
}