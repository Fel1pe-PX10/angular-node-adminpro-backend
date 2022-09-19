/*
    Ruta: /api/todo/
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');

const { resultadoMiddelware } = require('../middlewares/validacion-campos');
const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:busqueda', validarJwt, getTodo );

router.get('/coleccion/:tabla/:busqueda', validarJwt, getDocumentosColeccion );

/* router.post('/', [
    validarJwt,
    check('nombre', 'El nombre del hospital es necesario').notEmpty(),
    resultadoMiddelware
], crearHospital );

router.put('/:id', [
    
], actualizarHospital );

router.delete('/:id', validarJwt, borrarHospital ); */




module.exports = router;