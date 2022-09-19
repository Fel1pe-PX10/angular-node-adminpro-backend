/*
    Ruta: /api/hospitales
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');

const { resultadoMiddelware } = require('../middlewares/validacion-campos');
const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJwt, getHospitales );

router.post('/', [
    validarJwt,
    check('nombre', 'El nombre del hospital es necesario').notEmpty(),
    resultadoMiddelware
], crearHospital );

router.put('/:id', [
    
], actualizarHospital );

router.delete('/:id', validarJwt, borrarHospital );




module.exports = router;