const { response } = require("express");
const hospital = require("../models/hospital");

const Hospital = require('../models/hospital');

const getHospitales = async(req, res=response) => {

    const hospitales = await Hospital.find()
                                    .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    });

}

const crearHospital = async(req, res=response) => {

    const uid = req.uid;
    const hospital = new Hospital({
            usuario: uid,
            ...req.body
        });

    try {

        hospitalDb = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDb
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
   

}

const actualizarHospital = async(req, res=response) => {

    const id  = req.params.id;
    const uid = req.uid; // se tiene acceso al uid porque se pasa por la autenticación del usuario

    try {

        const hospitalDb = await Hospital.findById(id);

        if(!hospitalDb){
            return res.status(400).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        };

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true }); // { new: true } hace que se devuelva el documento acutalizado en la respuesta


        res.json({
            ok: true,
            hospital: hospitalActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }

}

const borrarHospital = async(req, res=response) => {

    const id = req.params.id;

    try {

        const hospitalDb = await Hospital.findById(id);

        if(!hospitalDb){
            return res.status(400).json({
                ok: false,
                msg: 'Error: No se encontró hospital por Id'
            });
        }

        await Hospital.findByIdAndDelete(id);
        
        res.json({
            ok: true,
            msg: 'borrarHospitales'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error borrando hospital, hable con el administrador'
        });
    }



}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}