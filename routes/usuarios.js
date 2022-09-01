/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, crearUsuario } = require('../controllers/usuarios');
const { resultadoMiddelware } = require('../middlewares/validacion-campos');

const router = Router();


router.get('/', getUsuarios );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    resultadoMiddelware
],crearUsuario );




module.exports = router;