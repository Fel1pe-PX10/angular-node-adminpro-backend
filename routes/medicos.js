/*
    Ruta: /api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { actualizarHospital } = require('../controllers/hospitales');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico, getMecidoById } = require('../controllers/medicos');



const { resultadoMiddelware } = require('../middlewares/validacion-campos');
const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJwt, getMedicos );

router.post('/', [
    validarJwt,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('hospital', 'El hospital id debe ser valido').isMongoId(),
    resultadoMiddelware
], crearMedico );

router.put('/:id', [
    validarJwt,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('hospital', 'El hospital id debe ser valido').isMongoId(),
    resultadoMiddelware
], actualizarMedico );

router.delete('/:id', validarJwt, borrarMedico );

router.get('/:id', validarJwt, getMecidoById );




module.exports = router;