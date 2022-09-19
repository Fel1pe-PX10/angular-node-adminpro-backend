const fs = require('fs');

const { response } = require("express")

const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');

const borrarImagen = (path) => {
    
    if(fs.existsSync(path)){
        // Borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async (coleccion, id, nombreArchivo) => {

    let pathViejo;

    switch (coleccion) {
        case 'hospitales':

            const hospital = await Hospital.findById(id);
            if(!hospital){
                console.log('No se encontró hospital por id');
                return false;
            }

            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

            break;
        case 'medicos':
            const medico = await Medico.findById(id);
            if(!medico){
                console.log('No se encontró médico por id');
                return false;
            }

            pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;
            
            break;
        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if(!usuario){
                console.log('No se encontró usuario por id');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            
            break;
    
        default:
            break;
    }

}


module.exports = {
    actualizarImagen
}