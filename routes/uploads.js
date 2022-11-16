/*
    Ruta: /api/uploads
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { fileUpload, retornaImagen } = require('../controllers/uploads');

const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();

router.use(expressFileUpload());

router.put('/:coleccion/:id', [
    validarJwt
], fileUpload );

router.get('/:coleccion/:foto?', retornaImagen );


module.exports = router;