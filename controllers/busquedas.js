const { response } = require("express");

const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');

const getTodo = async (req, res=response) => {

    const busqueda = req.params.busqueda;
    const regex    = new RegExp(busqueda, 'i');

    const [hospitales, medicos, usuarios] = await Promise.all([
        Hospital.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Usuario.find({ nombre: regex })
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales 
    });
}

const getDocumentosColeccion = async (req, res=response) => {

    const tabla    = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex    = new RegExp(busqueda, 'i');

    let data;

    switch (tabla) {
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                                    .populate('usuario', 'nombre img');
            break;
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex })
            break;
    
        default:
            return res.status(400).json({
                ok:false,
                msg: 'La tabla tienen que ser hospitales, medicos o usuarios.'
            });
            break;
    }

    res.json({
        ok: true,
        data 
    });
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}