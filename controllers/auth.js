

const { response } = require('express');
const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuario');

const { generarJwt } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');



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

const googleSignIn = async(req, res=response) => {

    try {
        const {email, name, picture} = await googleVerify(req.body.token);

        // Validar si usuario se encuentra en la base de datos 
        const usuarioDb = await Usuario.findOne({email});
        let usuario;

        // Si el usuario no existe se crea, en caso contrario se actualiza registro y se indica que ingreso por google
        if(!usuarioDb){
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        }
        else{
            usuario = usuarioDb;
            usuario.google = true;
        }

        // Se guarda al usuario
        await usuario.save();

        // Generar el JWT
        const token = await generarJwt(usuario.id);

        res.json({
            ok: true,
            email, 
            name, 
            picture,
            token
        });
        
    } catch (error) {
        console.log(error);

        res.status(400).json({
            ok: false,
            msg: "Token de google no es correcto"
        });
    }

}

const renewToken = async(req, res=response) => {

    const uid = req.uid;

    // Generar el JWT
    const token = await generarJwt(uid);

    res.json({
        ok: true,
        token
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}