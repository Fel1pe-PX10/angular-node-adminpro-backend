const { response } = require("express");

const Medico   = require('../models/medico');
const Hospital = require('../models/hospital');

const getMedicos = async(req, res=response) => {

    const medicos = await Medico.find()
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    });

}

const crearMedico = async(req, res=response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDb = await medico.save();

        res.json({
            ok: true,
            medico: medicoDb
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const actualizarMedico = async(req, res=response) => {

    const id = req.params.id;

    try {

        const medicoDb = await Medico.findById(id);
        if(!medicoDb){
            return res.status(400).json({
                ok: false,
                msg: 'Error: Médico no encontrado por Id'
            });
            
        }

        const hospitalDb = await Hospital.findById(req.body.hospital);
        if(!hospitalDb){
            return res.status(400).json({
                ok: false,
                msg: 'Error: Hospital no encontrado por Id'
            });
            
        }

        const cambiosMedico = {
            ...req.body,
            usuario: req.uid
        };

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            medico: medicoActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error actualizar Médico: Hable con el administrador'
        });
        
    }


}

const borrarMedico = async(req, res=response) => {

    const id = req.params.id;

    try {
        const medicoDb = await Medico.findById(id);
        if(!medicoDb){
            res.status(400).json({
                ok: false,
                msg: 'Error: Médico no encontrado por Id'
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'borrarMedico'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error borrando Médico: Hablar con el administrador'
        });
    }


}

const getMecidoById = async(req, res=response) => {

    const id = req.params.id;

    try {
        const medico = await Medico.findById(id)
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');

        res.json({
            ok: true,
            medico
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error, Por favor contacte al administrador'
        });

    }

}

module.exports = {
    actualizarMedico,
    borrarMedico,
    crearMedico,
    getMedicos,
    getMecidoById,
}