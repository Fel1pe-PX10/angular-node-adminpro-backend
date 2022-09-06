const  jwt = require('jsonwebtoken');


const generarJwt = (uid) => {

    return new Promise((resolve, reject) => {
        
        const payload = {
            uid
        }
    
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '12h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generarl el JWT');
            }
            else{
                resolve(token);
            }
        });
    })
    
}


module.exports = {
    generarJwt
}