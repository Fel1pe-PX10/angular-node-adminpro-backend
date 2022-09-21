/*
    Ruta: /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { resultadoMiddelware } = require('../middlewares/validacion-campos');

const router = Router();

router.post('/', [
    check('email', 'El email es obligatorio').notEmpty(),
    check('password', 'El password es obligatorio').notEmpty(),
    resultadoMiddelware
],login );

router.post('/google', [
    check('token', 'El token de Google es obligatorio').notEmpty(),
    resultadoMiddelware
], googleSignIn );


module.exports = router;