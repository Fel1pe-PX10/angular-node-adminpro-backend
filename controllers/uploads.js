const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = async(req, res=response) => {

    const { coleccion, id } = req.params;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if(!tiposValidos.includes(coleccion)){
        res.status(400).json({
            ok: true,
            mgs: 'No es un tipo de colección válida'
        })
    }

    // Confirma si viene tiene un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se seleccionó ningún archivo'
        });
    }

    // Recupera archivo
    const file = req.files.imagen; // Imagen es el nombre con el que se envio de postman

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Extensiones validas
    const extensionesValidas = ['png', 'jpg', 'jpeg','gif'];
    if( !extensionesValidas.includes(extensionArchivo) ){
        res.status(400).json({
            ok: true,
            mgs: 'El archivo no tiene un formato válido'
        })
    }

    // Generar el nombre del archivo (uuid)
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Path para guardar imagen
    const path = `./uploads/${coleccion}/${nombreArchivo}`;

    // mover imagen
    file.mv( path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Fallo al cargar la imagen'
            });
        }

        res.json({
            ok: true,
            mgs: 'Archivo Cargado',
            nombreArchivo
        })
    });

    // Actualizar base de datos
    await actualizarImagen(coleccion, id, nombreArchivo);
}

const retornaImagen = (req, res=response) => {

    const { coleccion, foto } = req.params;

    const pathImg = path.join(__dirname, `../uploads/${coleccion}/${foto}`);

    // Imagen por defecto
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }
    else{
        const pathImg = path.join(__dirname, `../uploads/no-image.png`);
        res.sendFile(pathImg);
    }

}

module.exports = {
    fileUpload,
    retornaImagen
}