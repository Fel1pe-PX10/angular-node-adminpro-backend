/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { resultadoMiddelware } = require('../middlewares/validacion-campos');
const { validarJwt, validarAdminRole, validarAdminRoleOMismousuario } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/', validarJwt, getUsuarios );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    resultadoMiddelware
],crearUsuario );

router.put('/:id', [
    validarJwt,
    validarAdminRoleOMismousuario,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    resultadoMiddelware
], actualizarUsuario );

router.delete('/:id', validarJwt, borrarUsuario );




module.exports = router;