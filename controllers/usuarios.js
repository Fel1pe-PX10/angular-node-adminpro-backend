
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJwt } = require('../helpers/jwt');

const Usuario = require('../models/usuario');




const  getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find();

    res.json({
        ok:true,
        usuarios,
        uid: req.uid
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

        // Encriptacion de la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        await usuario.save();

        // Generar JWT
        const token = await generarJwt(usuario.id);


        res.json({
            ok:true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}


const actualizarUsuario = async(req, res=response) => {
    
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        // Validar token y comprobar si es el usuario correcto

        
        // Actualizaciones
        const { password, google, email, ...campos} = req.body;
        
        if( usuarioDB.email !==email){
            const usuarioExiste = await Usuario.findOne({email});
            if(usuarioExiste){
                return res.status(400).json({
                    ok:true,
                    msg: 'Ya existe un email en la base de datos'
                });
            }
        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        return res.status(200).json({
            ok: true,
            msg: usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
        
    }
    
}


const borrarUsuario = async(req, res=response) => {

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Usuario Eliminado'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}



module.exports = {
    actualizarUsuario,
    borrarUsuario,
    crearUsuario,
    getUsuarios
}